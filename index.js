import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
/*app.use(express.json());
app.use(cors()); // Permite que o React (Vite) acesse o backend
 */

app.use(express.json());

// 🌟 SUBSTITUA O SEU CORS ANTIGO POR ESTE BLOCO ABAIXO:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite exatamente o seu React
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Se for uma requisição de teste do navegador (Preflight/OPTIONS), responde logo com OK
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});



// Configuração do seu Banco de Dados MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',          // Seu usuário do MySQL
  password: '1234',  // Sua senha do MySQL
  database: 'teste'
};

// Rota de Login que o React vai chamar
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Consulta SQL buscando o nome de usuário enviado pelo formulário
    // Importante: Em produção reais, use bcrypt para checar senhas criptografadas!
    const [rows] = await connection.execute(
      'SELECT * FROM usuario WHERE nome = ? AND senha = ?',
      [username, password]
    );

    await connection.end();

    if (rows.length > 0) {
      // Usuário encontrado no MySQL!
      res.json({ success: true, username: rows[0].nome });
    } else {
      // Usuário não encontrado ou senha incorreta
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados.' });
  }
});

app.listen(3000, () => console.log('Servidor backend rodando na porta 3000'));