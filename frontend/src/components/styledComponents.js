import styled from 'styled-components';

export const BoardList = styled.div`
    width: 80%;
    margin: 20px auto;

    .title {
        font-size: 2rem;
        font-weight: bold;
    };

    .writer {
        font-size: 1.2rem;
    };

    .date, .views {
        font-size: 0.75rem;
        margin-top: 2.3 rem;
        text-align: right; 
    };

    .content {
        margin-top: 2%;
        font-size: 1.2rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-all;
        border: 2px solid #ced4da;
        padding: 1em;
        border-radius: 0.25em;
    };
`;

// 게시판 버튼 : 글쓰기 버튼
export const BoardBtn = styled.div`
    width: 30%;
    margin: 2em auto;

    button {
        width: 100%;
        height: 3rem;
    }
`;

// 게시판 헤드 : 게시판
export const BoardHead = styled.div`
    width: 80%;
    margin: 2em auto;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
`;

// 게시판 상세 헤드 : 제목, 작성자, 날짜, 조회수
export const BoardHeadDetail = styled.div`
    width: 100%;
    margin: 2em auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
`;

// 버튼 그룹 : 수정, 삭제, 취소, 저장
export const BtnGroup = styled.div`
    width: 80%;
    margin: 2em auto;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;

    .editBtn, .deleteBtn, .cancelBtn, .saveBtn {
        width: 40%;
        height: 3rem;
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

// 글쓰기, 수정 폼
export const InputDiv = styled.div`
    width: 80%;
    margin: 2em auto;

    .inputGroup {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1em;

        span {
            width: 13%;
            font-size: 0.9rem;  
            font-weight: bold;
            white-space: nowrap;
        };

        input {
            width: 80%;
            height: 2.5em;
            font-size: 0.9rem;
            padding: 0.5em;
            border: 1px solid #ced4da;
            border-radius: 0.25em;
        };

        textarea {
            width: 100%;
            height: 15em;
            font-size: 1rem;
            padding: 0.5em;
            border: 1px solid #ced4da;
            border-radius: 0.25em;
            resize: vertical;
        };

    };
`;

// 페이지네이션 버튼 그룹
export const Pagination = styled.div`
    width: 20%;
    margin: 2em auto;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
`;