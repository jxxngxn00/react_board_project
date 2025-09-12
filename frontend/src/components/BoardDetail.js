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
  }, [board.views, param.id]);

  // 게시글 삭제
  const deletePost = () => {
    const result = window.confirm("글을 삭제합니다. 계속하시겠습니까?");
    if (!result) return;
    fetch('/api/delete/' + param.id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'  
        },
    })
    .then(res => res.json()).then(data => console.log(data))
    .catch(err => console.log(err));
    alert("글이 삭제되었습니다.");
    navigate("/");
  }

  // 시간 형식 변환
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
        <S.BoardList className='container'>
          <Button variant='outline-secondary' size='sm' className='backBtn' onClick={() => navigate(`/`)}>뒤로 가기</Button>
          <span className='id' style={{ display: 'none' }}>{board.id}</span>
          <S.BoardHeadDetail className='boardDetailHead'>
            <div className='info'>
              <div className='title'>{board.title + (board.update_at ? "(수정됨)" : "")}</div>
              <div className='writer'>{board.writer}</div>
            </div>
            <div className='extraInfo'>
              <div className='date'>작성일 : {formatDate(board.created_at)}</div>
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