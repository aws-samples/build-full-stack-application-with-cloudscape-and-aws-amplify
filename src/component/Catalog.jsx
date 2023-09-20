// ui
import React, { useEffect, useState } from "react";
import {
  Box,
  Cards,
  Container,
  Grid,
  Header,
  Link,
  Pagination,
  SpaceBetween,
  StatusIndicator,
} from "@cloudscape-design/components";

// components
import { Comments } from './Comments'
import VideoPlayer from './VideoPlayer'

// apis
import { API, graphqlOperation } from 'aws-amplify'
import { listCourses, listClasses } from '../graphql/queries'

export function Catalog(props) {
  const [activeClass, setActiveClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [courses] = useAsyncData(() => fetchCoursesApi());

  return (
    <>
      <Grid gridDefinition={[{ colspan: 3 }, { colspan: 9 }]}>
        <Container>
          {
            courses.map(course =>
              <Course
                key={course.id}
                course={course}
                activeCourse={activeCourse}
                setActiveCourse={setActiveCourse}
                setActiveClass={setActiveClass}
              />
            )
          }
        </Container>
        {
          (activeClass && activeClass != null && activeClass.class_flag <= 0) ? (
            <Class activeClass={activeClass} userName={props.user} />
          ) : (
            <ClassCatalog activeCourse={activeCourse} setActiveClass={setActiveClass} />
          )
        }
      </Grid>
    </>
  );
}

const Course = ({
  course,
  activeCourse,
  setActiveCourse,
  setActiveClass,
}) => {
  if (!activeCourse) { setActiveCourse({id: course.id, title: course.name}) }
  const switchCourseHandler = () => {
    setActiveCourse({id: course.id, title: course.name});
    setActiveClass(null);
  }

  return (
    <Box>
      <Link onFollow={switchCourseHandler}>{course.name}</Link>
    </Box>
  );
}

const ClassCatalog = ({
  activeCourse,
  setActiveClass,
}) => {
  const [classes] = useAsyncData(() => fetchClassesApi(activeCourse));

  return (
    <Cards
      ariaLabels={{
        itemSelectionLabel: (e, n) => `select ${n.name}`,
        selectionGroupLabel: "Item selection"
      }}
      cardDefinition={{
        header: item => (
          <Link
            fontSize="heading-m"
            href={item.id}
            onFollow={(e) => {
                e.preventDefault();
                setActiveClass(classes.find(element => element.id === e.detail.href));
              }
            }
          >
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: "image",
            content: item => (<img src={item.image} alt={item.name} width='100%' />)
          },
          {
            id: "description",
            header: "Description",
            content: item => item.description
          },
          {
            id: 'state',
            header: 'Status',
            content: item => (
              <StatusIndicator type={item.class_flag > 0 ? 'error' : 'success'}>{item.class_flag > 0 ? "Unavailable" : "Available"}</StatusIndicator>
            ),
          },
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      isItemDisabled={item => (item.class_flag > 0)}
      items={classes.sort((a, b) => a.class_flag - b.class_flag)}
      loadingText="Loading contents"
      empty={
        <Box
          padding={{ bottom: "s" }}
          fontSize="heading-s"
          textAlign="center"
          color="inherit"
        >
          <b>No Contents</b>
        </Box>
      }
      header={activeCourse && activeCourse != null ? (<Header>{activeCourse.title}</Header>) : (<div />)}
      pagination={
        <Pagination currentPageIndex={1} pagesCount={2} />
      }
    />
  );
} 

const Class = ({
  activeClass,
  name,
  author,
  description,
  videoUrl,
  userName,
}) => {
  return (
    <>
      <SpaceBetween size="l">
        <VideoPlayer classId={activeClass.id} videoName={activeClass.name} videoDescription={activeClass.description} videoAuthor={activeClass.author} videoUrl={activeClass.url} userName={userName} />
        <Comments classId={activeClass.id} />
      </SpaceBetween>
    </>
  );
}

function useAsyncData(loadItems) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let rendered = true;
    loadItems().then(items => {
      if (rendered) {
        setItems(items);
        setLoading(false);
      }
    });
    return () => {
      rendered = false;
    };
  }, [loadItems]);

  return [items, loading];
}

// graphql apis
function fetchCoursesApi() {
  try {
    return API.graphql(graphqlOperation(listCourses)).then(
      result => {
        return result.data.listCourses.items;
    });
  }
  catch (e) {
    console.log(e);
  }
}

function fetchClassesApi(course) {
  let courseId = null;
  if (course && course != null) {
    courseId = course.id;
  }

  try {
    return API.graphql(graphqlOperation(listClasses, {filter: {courseId: {eq: courseId}}})).then(
      result => {
        return result.data.listClasses.items;
    });
  }
  catch (e) {
    console.log(e);
  }
}
