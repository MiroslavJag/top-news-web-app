import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {useTranslation} from 'react-i18next'
import {getTopNews} from '../../../services/topNews'
import NoImage from 'static/images/no-image-thumbnail.jpg'
import {NewsTitleWrapper} from 'components/pageComponents/Home'
import icons from '../../../static/icons'
import {Link} from 'react-router-dom'
import {CATEGORIES, API_ROUTES} from 'routes.json'

const responsive = {
  largeDesktop: {
    breakpoint: {max: 2560, min: 1440},
    items: 4,
    slidesToSlide: 1,
  },
  mediumDesktop: {
    breakpoint: {max: 1439, min: 1240},
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 20,
  },
  desktop: {
    breakpoint: {max: 1239, min: 1024},
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 80,
  },
  tablet: {
    breakpoint: {max: 1023, min: 464},
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 50,
  },
  mobileSmall: {
    breakpoint: {max: 464, min: 0},
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
}

const SliderListWrapper = styled.div`
  max-with: 1340px;
  width: 100%;
  display: grid;
`

const Slide = styled.div`
  width: 250px;
  padding: 15px;
  border: 1px solid lightgrey;
  cursor: pointer;
`
const CategoryTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  > a {
    text-decoration: none;
    color: darkslategrey;

    &:hover {
      color: grey;
    }
  }
`
const CategoryTitle = styled.h2`
  margin-right: 20px;
  text-transform: capitalize;
`
const CategoryTitleMark = styled.div`
  height: 10px;
  width: 10px;
  margin-right: 20px;
  background-color: ${(props) => (props.showSlider ? 'darkcyan' : 'lightgray')};
  align-self: center;
`
const SliderWrapper = styled.div`
  display: flex;
  height: ${(props) => (props.show ? '300px' : 0)};
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
`

const CategoryExpanedArrow = styled.img`
  height: 20px;
  align-self: center;
  cursor: pointer;
`

export const SliderNewsImage = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  object-position: top;
  object-fit: cover;
  cursor: pointer;
`
const SliderNewsTitle = styled.p`
  margin: 0;
  height: 100%;
  font-weight: bold;
`

export const SliderNewsTitleWrapper = styled.div`
  margin-top: 5px;
  overflow: hidden;
  width: 100%;
  display: -webkit-box;
  height: 75px;
  margin-bottom: 5px;
  -webkit-line-clamp: 3;
`

type Props = {
  langCode: String,
  category: String,
  setSingleNewsData: Function,
}

const Slider = ({category, langCode, setSingleNewsData}): Props => {
  const [data, setData] = useState(null)
  const [showSlider, setShowSlider] = useState(false)
  const {t} = useTranslation()

  useEffect(() => {
    fetchTopNewsByCategory()
  }, [langCode])

  const fetchTopNewsByCategory = async (route) => {
    const newsData = await getTopNews(API_ROUTES.TOP_HEADLINES, langCode, category, 5)
    setData(newsData)
  }

  const slider = () => (
    <SliderListWrapper>
      {data !== null ? (
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          partialVisbile
          keyBoardControl={true}
          containerClass={'carousel-container'}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {data.articles.map((el, index) => {
            return (
              <Slide onClick={() => setSingleNewsData(el)} key={index}>
                <SliderNewsTitleWrapper>
                  <SliderNewsTitle>{el.title}</SliderNewsTitle>
                </SliderNewsTitleWrapper>
                <SliderNewsImage
                  src={el.urlToImage || NoImage}
                  onError={(e) => (e.target.src = NoImage)}
                  draggable={'false'}
                />
              </Slide>
            )
          })}
        </Carousel>
      ) : null}
    </SliderListWrapper>
  )

  return (
    <>
      <CategoryTitleWrapper>
        <CategoryTitleMark showSlider={showSlider} />
        <Link to={`${CATEGORIES.text}/${category}`}>
          <CategoryTitle>{t(category.toUpperCase())}</CategoryTitle>
        </Link>
        <CategoryExpanedArrow
          src={showSlider ? icons.arrows.up : icons.arrows.down}
          onClick={() => setShowSlider(!showSlider)}
        />
      </CategoryTitleWrapper>
      <SliderWrapper show={showSlider}>{slider()}</SliderWrapper>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    langCode: state.langCode,
  }
}

export default connect(mapStateToProps, null)(Slider)
