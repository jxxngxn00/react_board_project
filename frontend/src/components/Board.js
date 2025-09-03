import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styledComponents';
import { Button, Table } from 'react-bootstrap';

function Board() {
    const navigate = useNavigate();
    const [boards, setBoards] = React.useState([]);

    // 게시글 목록 조회
    useEffect(() => {
        fetch('http://localhost:3001/api/boards')
            .then(response => response.json())
            .then(data => setBoards(data))
            .catch(error => console.error('Error fetching boards:', error));
    }, []);

    // 게시글 등록으로 이동하기
    const Post = () => {
        navigate("/postform");
    };

    const goToDetail = async (id) => {
        // 조회수 증가
        fetch('/api/increaseViews/' + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'  
            },
        })
        .then(res => res.json()).then(data => console.log(data))
        .catch(err => console.log(err));

        // 상세 페이지로 이동
        navigate(`/board/${id}`);
    };

    return (
    <>
        <S.BoardList className='boardList'>
            <S.BoardHead className='boardHead'>게시판</S.BoardHead>
            
            <div className='boardListContainer'>
                <Table bordered hover>
                    <thead>
                        <tr>
                            {/* <th style={{ width: '10%' }}>번호</th> */}
                            <th style={{ width: '50%' }}>제목</th>
                            <th style={{ width: '20%' }}>작성자</th>
                            <th style={{ width: '20%' }}>조회수</th>
                            {/* <th style={{ width: '10%' }}>삭제</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map(board => (
                            <tr key={board.id} className='listItem' onClick={()=>goToDetail(board.id)}>
                                {/* <td className='listId' style={{ display: 'none' }}>{board.id}</td> */}
                                <td className='listTitle'>{board.title}</td>
                                <td className='listWriter'>{board.writer}</td>
                                {/* <td className='listDate'>{board.date}</td> */}
                                <td className='listViews'>{board.views}</td>
                                {/* <span className='listDelete'><button className='deleteBtn'>삭제</button></span> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <S.BoardBtn className='boardBtn'>
                <Button variant="outline-primary" size='lg' onClick={Post}>글쓰기</Button>
            </S.BoardBtn>
        </S.BoardList>
    </>
  )
}

export default Board