// PostForm.js : 게시글 작성 페이지
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './styledComponents';
import { Button } from 'react-bootstrap';

function PostForm() {
    const navigate = useNavigate();
    // 저장할 내용 : 작성자, 제목, 내용
    const [writer, setWriter] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 게시글 등록
    function savePost() {
        fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({writer: writer, title: title, content: content}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json()).then(data => console.log(data))
        .catch(err => console.log(err));
        
        alert("글이 등록되었습니다.");
        // 등록 후 게시판 목록으로 이동
        navigate("/");
    }
    // 게시판 목록으로 돌아가기
    const backToBoard = () => {
        navigate("/");
    }
  return (
    <S.BoardList>
        <Button variant='outline-secondary' size='sm' className='backBtn' onClick={() => navigate(`/`)}>뒤로 가기</Button>
        <S.InputDiv className='inputDiv container'>
            <div className='title'>글쓰기</div>
            <div className='inputGroup'>
                <span>제목</span>
                <input 
                    type='text'
                    placeholder='제목'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className='inputGroup'>
                <span>작성자</span>
                <input 
                    type='text'
                    placeholder='작성자'
                    value={writer}
                    onChange={(e)=>setWriter(e.target.value)}                    
                />
            </div>
            <div className='inputGroup'>
                <textarea 
                    placeholder='내용'
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                />
            </div>
            <S.BtnGroup className='btnGroup'>
                <Button variant='primary'  onClick={savePost} className='saveBtn'>저장</Button>
                <Button variant='secondary'  onClick={backToBoard} className='cancelBtn'>취소</Button>
            </S.BtnGroup>
        </S.InputDiv>

    </S.BoardList>
  )
}

export default PostForm