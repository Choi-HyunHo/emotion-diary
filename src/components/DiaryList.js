import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const sortOptionList = [
  { value: 'lastest', name: '최신 순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '전부 다' },
  { value: 'good', name: '좋은 감정' },
  { value: 'bad', name: '나쁜 감정' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  // value : select 가 어떤 것을 선택하는지 역할
  // onChange : select 가 선택하는게 변화했을 때 바꿀 기능을 하는 함수
  // optionList : select 태그 안에 들어갈 option

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // 정렬 기능
  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 1. 배열을 JSON 화 시켜서 문자열로 바꿉니다.
    // 2. 문자열을 parse -> 다시 배열로 바뀐다.
    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      <MyButton
        type={'positive'}
        text={'새 일기 쓰기'}
        onClick={() => navigate('/new')}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
