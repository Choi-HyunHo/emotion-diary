import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';

import MyHeader from './MyHeader';
import Mybutton from './MyButton';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  // 어떤 감정을 선택 했는지
  const [emotion, setEmotion] = useState(3);
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // textarea
  const [content, setContent] = useState('');
  const contentRef = useRef();

  // 날짜
  const [date, setDate] = useState(getStringDate(new Date()));

  // 작성완료
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정 하시겠습니까?' : '일기를 작성 하시겠습니까?'
      )
    ) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion);
      } else {
        onCreate(date, content, emotion);
      }
    }
    navigate('/', { replace: true });
  };

  // useEffect를 사용하여 isEdit와 originData가 변경될 때 isEdit가 true면 date값과 감정, 내용 상태를 각각 바꾸어 준다
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
        leftChild={
          <Mybutton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Mybutton text={'취소하기'} onClick={() => navigate(-1)}></Mybutton>
            <Mybutton
              text={'작성완료'}
              type={'positive'}
              onClick={handleSubmit}
            ></Mybutton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
