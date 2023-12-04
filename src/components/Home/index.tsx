"use client";
import { imgAtom } from "@/atom";
import { listProps } from "@/types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ListBox } from "../common";
import * as SC from "@/components/common/Styles/home";
import * as S from "./styled";
import Error404Icon from "@/assets/svg/Error404Icon";

const Home = ({ list }: { list?: listProps[] }) => {
  const [imgUrl, setImgUrl] = useRecoilState(imgAtom);
  const [isSSR, setIsSSR] = useState(true);
  const rn = [Math.floor(Math.random() * (list?.length ?? 1 - 1))][0];

  useEffect(() => {
    if (imgUrl.length === 0 && list) {
      setImgUrl([
        list[rn]?.cover?.external?.url ?? list[rn]?.cover?.file?.url ?? "",
        list[rn]?.properties.Name.title[0].text.content,
      ]);
      setTimeout(() => {
        setImgUrl([]);
      }, 3600000);
    }
  }, [imgUrl, list, rn, setImgUrl]);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return <></>;
  return (
    <SC.Wrapper>
      <SC.ListWrapper>
        {list && list.length > 0 ? (
          list.map((i, index) => (
            <ListBox
              key={index}
              cover={i.cover}
              title={i.properties.Name.title[0]?.text.content}
              category={i.properties.Category.multi_select}
            />
          ))
        ) : (
          <S.EmptyList>
            <Error404Icon />
            <span>찾으시는 드라마/영화가 없습니다 ...</span>
          </S.EmptyList>
        )}
      </SC.ListWrapper>
    </SC.Wrapper>
  );
};

export default Home;
