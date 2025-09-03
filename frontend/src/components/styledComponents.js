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

export const BoardBtn = styled.div`
    width: 30%;
    margin: 2em auto;

    button {
        width: 100%;
        height: 3rem;
    }
`;

export const BoardHead = styled.div`
    width: 80%;
    margin: 2em auto;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
`;

export const BoardHeadDetail = styled.div`
    width: 100%;
    margin: 2em auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
`;

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

export const InputDiv = styled.div`
    width: 80%;
    margin: 2em auto;

    .inputGroup {
        display: flex;
        align-items: center;
        margin-top: 1em;

        span {
            width: 13%;
            font-size: 1.2rem;  
            font-weight: bold;
        };

        input {
            width: 87%;
            height: 2.5em;
            font-size: 1.2rem;
            padding: 0.5em;
            border: 1px solid #ced4da;
            border-radius: 0.25em;
        };

        textarea {
            width: 100%;
            height: 15em;
            font-size: 1.2rem;
            padding: 0.5em;
            border: 1px solid #ced4da;
            border-radius: 0.25em;
            resize: vertical;
        };

    };
`;