import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styledComponents';
import { Button } from 'react-bootstrap';

function PostEditForm() {
    const navigate = useNavigate();
    const param = useParams();

    // 수정할 내용 : 작성자, 제목, 내용
    const [writer, setWriter] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 게시글 조회
    useEffect(() => {
        fetch('http://localhost:3001/api/boardDetail/' + param.id)
            .then(response => response.json())
            .then(data => {
                setWriter(data[0].writer);
                setTitle(data[0].title);
                setContent(data[0].content);
            })
            .catch(error => console.error('Error fetching boards:', error));
    }, [param.id]);

    // 게시글 수정
    function editPost() {
        fetch('/api/edit/' + param.id, {
            method: 'PUT',
            body: JSON.stringify({writer: writer, title: title, content: content}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json()).then(data => console.log(data))
        .catch(err => console.log(err));
        
        alert("글이 수정되었습니다.");
        // 수정 후 게시판 목록으로 이동
        navigate("/board/" + param.id );
    }
    // 게시판 목록으로 돌아가기
    const backToBoard = () => {
        navigate("/");
    }
  return (
    <S.BoardList>
        <Button variant='outline-secondary' size='sm' className='backBtn' onClick={() => navigate(`/`)}>뒤로 가기</Button>
        <S.InputDiv className='inputDiv container'>
            <div className='title'>글 수정하기</div>
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
                <Button variant="primary" onClick={editPost} className='saveBtn'>저장</Button>
                <Button variant="secondary" onClick={backToBoard} className='cancelBtn'>취소</Button>
            </S.BtnGroup>
        </S.InputDiv>
    </S.BoardList>
  )
}

export default PostEditForm