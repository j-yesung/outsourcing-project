export const ExtractCategoryNames = (data) => {
  const str = data.category_name;
  const regex = /> ([^>]+)$/; // "> " 뒤에 있는 마지막 단어를 잡는 정규식

  const match = str.match(regex);
  if (match) {
    const result = match[1];
    console.log(result);
    return `${result}_${data.id}`;
  } else {
    console.log('일치하는 문자열이 없습니다.');
  }
};
