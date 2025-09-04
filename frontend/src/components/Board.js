import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styledComponents';
import { Button, Table } from 'react-bootstrap';

function Board() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [boards, setBoards] = useState([]);

    // 게시글 목록 조회
    useEffect(() => {
        fetchBoards();
        // eslint-disable-next-line 
    }, [page]);

    // 게시글 조회
    const fetchBoards = async () => {
        fetch(`http://localhost:3001/api/boards/?page=${page}&limit=10`)
        .then(response => response.json())
        .then(data => {
            setBoards(data.data);
            setTotalPages(data.totalPages);
        })
        .catch(error => console.error('Error fetching boards:', error));
    };

    // 게시글 등록으로 이동하기
    const Post = () => {
        navigate("/postform");
    };

    const goToDetail = async (id) => {
        // 조회수 증가
        await fetch('/api/increaseViews/' + id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'  
            },
        })
        .then(res => res.json()).then(data => console.log(data))
        .catch(err => console.log(err));

        // 업데이트된 조회수 반영하여 다시 게시글 불러오기
        fetchBoards();

        // 상세 페이지로 이동
        navigate(`/board/${id}`);
    };

    return (
    <>
        <S.BoardList className='boardList'>
            <S.BoardHead className='boardHead'>게시판</S.BoardHead>
            <S.BoardBtn className='boardBtn'>
                <Button variant="outline-primary" size='lg' onClick={Post}>글쓰기</Button>
            </S.BoardBtn>
            
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
                                <td className='listTitle'>{board.title + (board.update_at ? " (수정됨)" : "")}</td>
                                <td className='listWriter'>{board.writer}</td>
                                {/* <td className='listDate'>{board.date}</td> */}
                                <td className='listViews'>{board.views}</td>
                                {/* <span className='listDelete'><button className='deleteBtn'>삭제</button></span> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* 페이지네이션 */}
            <S.Pagination className='pagination'>
                <Button variant='outline-secondary' size='sm' className='prevBtn' 
                    onClick={() => setPage( p => Math.max(p-1, 1))}>이전</Button>
                
                { Array.from({ length: totalPages }, (_, i) => (
                    <Button 
                        key={i + 1} 
                        variant={page === i + 1 ? 'primary' : 'outline-primary'}
                        size='sm'
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button variant='outline-secondary' size='sm' className='nextBtn' 
                onClick={() => setPage( p => Math.min(p + 1, totalPages))}>다음</Button>
            </S.Pagination>

            
        </S.BoardList>
    </>
  )
}

export default Board