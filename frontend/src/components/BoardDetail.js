import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as S from './styledComponents';

function BoardDetail() {
  const navigate = useNavigate();
  const param = useParams();
  const [board, setBoard] = useState([]);

  // 게시글 조회
  useEffect(() => {
      fetch('http://localhost:3001/api/boardDetail/' + param.id)
          .then(response => response.json())
          .then(data => setBoard(data[0]))
          .catch(error => console.error('Error fetching boards:', error));
  }, [param.id]);

  // 게시글 삭제
  const deletePost = () => {
    fetch('/api/delete/' + param.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'  
        },
    })
    .then(res => res.json()).then(data => console.log(data))
    .catch(err => console.log(err));
    // 삭제 후 게시판 목록으로 이동
    navigate("/");
  }

  return (
    <>
        <S.BoardList className='container'>
          <Button variant='outline-secondary' size='sm' className='backBtn' onClick={() => navigate(`/`)}>뒤로 가기</Button>
          <span className='id' style={{ display: 'none' }}>{board.id}</span>
          <S.BoardHeadDetail className='boardDetailHead'>
            <div className='info'>
              <div className='title'>{board.title}</div>
              <div className='writer'>{board.writer}</div>
            </div>
            <div className='extraInfo'>
              <div className='date'>작성일 : {board.created_at}</div>
              <div className='views'>조회수 : {board.views}</div>
            </div>
          </S.BoardHeadDetail>

          <div className='content'>{board.content}</div>
          <S.BtnGroup className='container btnGroup'>
              <Button variant='secondary' className='editBtn' onClick={() => navigate(`/edit/` + param.id)}>수정</Button>
              <Button variant='danger' className='deleteBtn' onClick={() => deletePost()}>삭제</Button>
          </S.BtnGroup>
        </S.BoardList>
    </>
  )
}

export default BoardDetail