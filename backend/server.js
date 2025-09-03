import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Supabase 클라이언트 설정
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


// 임시
app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.status(200).send({ message: 'Data received successfully', data });
});

// 게시글 등록
app.post('/api/post', async (req, res) => {
    const { writer, title, content } = req.body;
    // console.log('New Post:', { writer, title, content });

    const { data, error} = await supabase
        .from('board')
        .insert([
            { writer: writer, title: title, content: content }
    ]);

    res.status(200).send({ message: 'Post created successfully' });
});

// 게시글 목록 조회
app.get('/api/boards', async (req, res) => {
    try{
        let { data, error } = await supabase.from('board').select('*');
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        // console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 게시글 상세 조회
app.get('/api/boardDetail/:id', async (req, res) => {
    // const post = { id: postId, writer: 'Alice', title: 'First Post', content: 'Hello World!', views: 0 };
    try{
        const postId = req.params.id;
        let { data, error } = await supabase.from('board')
        .select('*')
        .eq('id', postId);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        // console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 조회수 증가
app.put('/api/increaseViews/:id', async (req, res) => {
    const postId = req.params.id
    const { error } = await supabase.rpc('increment_views', { row_id: postId })
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).send({ message: 'Views increased successfully' })
})

// 게시글 수정
app.put('/api/edit/:id', async (req, res) => {
    const postId = req.params.id;
    const { writer, title, content } = req.body;

    const { data, error } = await supabase
        .from('board')
        .update({ writer: writer, title: title, 
            content: content, update_at: new Date() })
        .eq('id', postId);
    if (error) return res.status(500).json({ error: error.message });

    console.log(`Update Post ${postId}:`, { writer, title, content });
    // res.status(200).send({ message: 'Post updated successfully' });
});

// 게시글 삭제
app.delete('/api/delete/:id', async (req, res) => {
    const postId = req.params.id;

    const { error } = await supabase
        .from('board')
        .delete()
        .eq('id', postId);
    if (error) return res.status(500).json({ error: error.message });

    console.log(`Delete Post ${postId}`);
    // res.status(200).send({ message: 'Post deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});