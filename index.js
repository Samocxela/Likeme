const express = require('express');
const cors = require('cors');
const {
  obtenerPosts,
  agregarPost,
  darLikePost,
  eliminarPost
} = require('./controllers/post');

const app = express();
app.listen(3001, console.log('SERVER UP AND RUNNING!!'));

app.use(cors());
app.use(express.json());

app.get('/posts', async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { titulo,url,descripcion} = req.body;
  const result = await agregarPost(titulo, url, descripcion);
  if (result) {
    res.send('Post agregado con éxito');
  } else {
    res.status(500).send('Ocurrio un error')
  }
  
});

app.put('/posts/like/:id',async (req,res)=>{
  const {id} = req.params;
  const result = await darLikePost(id);
  if (result) {
    res.send('Like agregado con éxito');
  } else {
    res.status(500).send('Ocurrio un error')
  }
  
});

app.delete('/posts/:id',async (req,res)=>{
  const {id} = req.params;
  const result = await eliminarPost(id);
  if (result) {
    res.send('Post Eliminado con éxito');
  } else {
    res.status(500).send('Ocurrio un error')
  }
  
});