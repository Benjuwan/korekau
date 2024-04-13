import styled from "styled-components";
import { ChangeEvent, memo, useState, FC } from "react";
import { trashType } from "../ts/trash";
import { useRegiTrashDate } from "../hooks/useRegiTrashDate";
import { useUpdateTrashDate } from "../hooks/useUpdateTrashDate";
import { useDeleteTrashDate } from "../hooks/useDeleteTrashDate";
import { useTargetElsRemoveClass } from "../../../hooks/useTargetElsRemoveClass";

type TrashFormType = {
    trashDateList?: trashType;
    trashDateUuid?: string;
}

export const TrashForm: FC<TrashFormType> = memo((props) => {
    const { trashDateList, trashDateUuid } = props;

    const [day, setDay] = useState<number>(1); // デフォルト：Monday
    const [trashDate, setTrashDate] = useState<string>('');

    const { regiTrashDate } = useRegiTrashDate();
    const { updateTrashDate } = useUpdateTrashDate();
    const { deleteTrashDate } = useDeleteTrashDate();
    const { targetElsRemoveClass } = useTargetElsRemoveClass();

    return (
        <TrashFormElm action="" onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            {
                trashDateList ?
                    (
                        updateTrashDate(trashDateUuid as string, day, trashDate),
                        targetElsRemoveClass('editerView', 'OnView')
                    ) :
                    regiTrashDate(day, trashDate)
            }
            setTrashDate((_prevTrashDate) => '');
        }}>
            <div className="formBlock">
                <label className="formLabel" htmlFor="daySelect">曜日</label>
                <select name="daySelect" id="daySelect" onChange={(e: ChangeEvent<HTMLSelectElement>) => setDay(parseInt(e.target.value))}>
                    <option value="1">（月）</option>
                    <option value="2">（火）</option>
                    <option value="3">（水）</option>
                    <option value="4">（木）</option>
                    <option value="5">（金）</option>
                    <option value="6">（土）</option>
                    <option value="0">（日）</option>
                </select>
            </div>
            <div className="formBlock">
                <label className="formLabel" htmlFor="trashDate">出せるゴミの種別・内容</label>
                <input type="text" value={trashDate} id="trashDate" onInput={(e: ChangeEvent<HTMLInputElement>) => setTrashDate((_prevTrashDate) => e.target.value)} placeholder="例：燃えるゴミ" />
            </div>
            <div className={trashDateList ? 'ctrlBtns' : undefined}>
                <input type="submit" disabled={trashDate.length <= 0} value={trashDateList ? '再登録' : '登録'} />
                {trashDateList &&
                    <button type="button" className="editerCloseBtn" onClick={() => targetElsRemoveClass('editerView', 'OnView')}>戻る</button>
                }
                {trashDateList &&
                    <button type="button" className="deleteBtn" onClick={() => deleteTrashDate(trashDateUuid as string)}><span className="material-symbols-outlined">delete</span></button>
                }
            </div>
        </TrashFormElm>
    );
});

const TrashFormElm = styled.form`
width: 100%;
border-radius: 4px;
padding: 1.5em;
box-shadow: 0 0 8px rgba(160, 160, 160, .5) inset;
margin: .5em auto 5em;
background-color: #fff;

    & select,
    & input {
        font-size: 16px;
        line-height: 2;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #c6c6c6;
    }

    & .ctrlBtns {
        display: flex;
        justify-content: space-between;
        gap: 5%;
    }

    & .deleteBtn {
        width: fit-content;
        appearance: none;
        background-color: transparent;
        border-radius: 0;
        border: 0;
        padding: 0;
        cursor: pointer;
        color: #fff;

        & span {
            vertical-align: middle;
            box-shadow: 0 0 8px rgba(0, 0, 0, .25) inset;
            border-radius: .4rem;
            padding: .25em;
            background-color: #cc3226;
        }
    }

    & .editerCloseBtn {
        background-color: #59b835;
        width: 20%;
        border-radius: .4rem;

        &:hover {
            color: #fff;
        }
    }

    & input {
        padding-left: .5em;

        &[type="submit"] {
            display: block;
            width: 100%;
            color: #fff;
            background-color: #676767;
            letter-spacing: 0.5em;
            transition: all .25s;
            
            &[disabled]{
                color: #999;
                background-color: #393939; 
            }
            
            &:not([disabled]):hover {
                cursor: pointer;
                color: #676767;
                border-color: #676767;
                background-color: #fff;
            }
        }
    }

    & .flexBox {
        display: flex;
        align-items: flex-start;
        gap: 5em;
    }

    & .formBlock {
        margin-bottom: 2em;
        
        & .formLabel {
            line-height: 2;
            border-left: 4px solid #676767;
            padding-left: .5em;
            margin-bottom: .5em;
        }
    }

@media screen and (min-width: 1025px) {
    & .deleteBtn {
        & span {
            border-radius: 4px;
        }
    }
}
`;