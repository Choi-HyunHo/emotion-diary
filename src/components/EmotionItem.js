const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_desc,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        'emotion_item',
        isSelected ? `emotion_item_on_${emotion_id}` : `emotion_item_off`,
      ].join(' ')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_desc}</span>
    </div>
  );
};

export default EmotionItem;
