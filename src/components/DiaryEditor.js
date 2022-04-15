import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';

import MyHeader from './MyHeader';
import Mybutton from './MyButton';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_desc: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_desc: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_desc: '그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_desc: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_desc: '끔찍함',
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
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
  const { onCreate } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, emotion);
    navigate('/', { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={'새 일기쓰기'}
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
