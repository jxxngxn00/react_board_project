import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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
    origin: `${ process.env.LOCALHOST }:3000`,
    credentials: true,
}));

// ===== React 정적 파일 서빙 =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// React 빌드된 정적 파일 제공
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ===== API 라우트 =====
app.get('/', (req, res) => {
    res.send('Backend is running!');
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

// 게시글 목록 조회 + 페이지네이션
app.get('/api/boards', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // 기본값은 1페이지
    const limit = parseInt(req.query.limit) || 10; // 기본값은 페이지당 10개 게시글
    const offset = (page - 1) * limit;  // 건너뛸 게시글 수
    try{

        // 데이터 가져오기
        let { data, error } = await supabase.from('board')
        .select('*')
        .order('created_at', { ascending: false })
        .order('id', { ascending : false })
        .range(offset, offset + limit - 1); // 범위 지정 (0부터 시작)
        if (error) {
            return res.status(500).json({ error: error.message });  
        }

        // 총 개수 가져오기
        let { count, error: countError } = await supabase.from('board')
        .select('*', { count: 'exact', head: true });
        if (countError) {
            return res.status(500).json({ error: countError.message });  
        }   

        const totalPages = Math.ceil(count / limit); // 총 페이지 수 계산
        const isLastPage = page >= totalPages; // 마지막 페이지 여부
        res.status(200).json({data, page, totalPages, isLastPage,
            totalCount: count
        });

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

    // console.log(`Update Post ${postId}:`, { writer, title, content });
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

    // console.log(`Delete Post ${postId}`);
    // res.status(200).send({ message: 'Post deleted successfully' });
});
// API가 아닌 모든 요청 -> React 앱의 index.html 반환
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});