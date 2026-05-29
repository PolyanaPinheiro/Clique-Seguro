import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'teste'
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT * FROM usuario WHERE nome = ? AND senha = ?',
      [username, password]
    );
    await connection.end();
    if (rows.length > 0) {
      res.json({ success: true, username: rows[0].nome });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados.' });
  }
});

// ─── REGISTRAR TUTORIAL CONCLUÍDO ─────────────────────────────────────────
app.post('/api/tutorial/complete', async (req, res) => {
  const { username, tutorialId, tutorialTitle, categoryId } = req.body;

  if (!username || !tutorialId || !tutorialTitle || !categoryId) {
    return res.status(400).json({ success: false, message: 'Dados incompletos.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Busca o id do usuário
    const [users] = await connection.execute(
      'SELECT id_usuario FROM usuario WHERE nome = ?',
      [username]
    );

    if (users.length === 0) {
      await connection.end();
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const userId = users[0].id;

    // Verifica se já foi registrado (evita duplicatas)
    const [existing] = await connection.execute(
      'SELECT id_usuario FROM progresso WHERE usuario_id = ? AND tutorial_id = ?',
      [userId, tutorialId]
    );

    if (existing.length === 0) {
      // Insere o novo registro
      await connection.execute(
        `INSERT INTO progresso (id_usuario, id_tutorial, titulo, id_categoria, concluido_em)
         VALUES (?, ?, ?, ?, NOW())`,
        [userId, tutorialId, tutorialTitle, categoryId]
      );
    }

    await connection.end();
    res.json({ success: true, message: 'Progresso salvo!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao salvar progresso.' });
  }
});

// ─── BUSCAR PROGRESSO DO USUÁRIO ──────────────────────────────────────────
app.get('/api/progress/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Busca id do usuário
    const [users] = await connection.execute(
      'SELECT id FROM usuario WHERE nome = ?',
      [username]
    );

    if (users.length === 0) {
      await connection.end();
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const userId = users[0].id;

    // Busca todos os tutoriais concluídos | é de progresso, mas o titulotem que vir de onde
    const [completions] = await connection.execute(
      `SELECT id_tutorial, titulo, id_categoria, concluido_em
       FROM progresso
       WHERE id_usuario = ?
       ORDER BY concluido_em DESC`,
      [userId]
    );

    await connection.end();

    // Totais fixos por categoria (devem refletir o que está no frontend)
    const categoryTotals = {
      'ferramentas-celular': { name: 'Ferramentas do Celular', total: 9, color: 'blue' },
      'comunicacao':         { name: 'Comunicação',            total: 6, color: 'green' },
      'golpes-seguranca':    { name: 'Golpes e Segurança',     total: 6, color: 'orange' },
      'contas-bancos':       { name: 'Contas e Bancos',        total: 6, color: 'purple' },
    };

    // Calcula concluídos por categoria
    const completedByCategory = {};
    for (const row of completions) {
      if (!completedByCategory[row.categoria_id]) {
        completedByCategory[row.categoria_id] = new Set();
      }
      completedByCategory[row.categoria_id].add(row.tutorial_id);
    }

    const categories = Object.entries(categoryTotals).map(([id, info]) => ({
      id,
      name: info.name,
      completed: completedByCategory[id]?.size || 0,
      total: info.total,
      color: info.color,
    }));

    const totalCompleted = new Set(completions.map(c => c.tutorial_id)).size;
    const totalTutorials = Object.values(categoryTotals).reduce((s, c) => s + c.total, 0);

    // Últimos 5 concluídos
    const recentCompletions = completions.slice(0, 5).map(c => ({
      id: c.tutorial_id,
      title: c.tutorial_titulo,
      category: c.categoria_id,
      date: c.concluido_em,
    }));

    res.json({
      success: true,
      totalTutorials,
      completedTutorials: totalCompleted,
      categories,
      recentCompletions,
      allCompleted: new Set(completions.map(c => c.tutorial_id)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao buscar progresso.' });
  }
});

app.listen(3500, () => console.log('Servidor backend rodando na porta 3500'));
