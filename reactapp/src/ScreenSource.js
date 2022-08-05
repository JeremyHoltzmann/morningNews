import React, { useState, useEffect } from "react";
import "./App.css";
import { List, Avatar, Button, Row } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  function changeLangue(langue) {
    console.log(
      "🚀 ~ file: ScreenArticlesBySource.js ~ line 36 ~ ScreenArticlesBySource ~ langue",
      langue
    );
    props.changeLanguage(langue);
  }

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines/sources?apiKey=dd0594311c8644e7a83119ce2dcdd00b&language=" +
        props.language
    )
      .then((response) => response.json())
      .then((data) =>
        setSourceList(
          data.sources.map((element) => ({
            id: element.id,
            name: element.name,
            url: element.url,
            description: element.description,
            category: element.category,
          }))
        )
      );
  }, []);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines/sources?apiKey=dd0594311c8644e7a83119ce2dcdd00b&language=" +
        props.language
    )
      .then((response) => response.json())
      .then((data) =>
        setSourceList(
          data.sources.map((element) => ({
            id: element.id,
            name: element.name,
            url: element.url,
            description: element.description,
            category: element.category,
          }))
        )
      );
  }, [props.language]);

  return (
    <div>
      <Nav />

      <Row className="Banner" value="large" type="flex" justify="center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Flag_of_France_%28lighter_variant%29.svg/500px-Flag_of_France_%28lighter_variant%29.svg.png"
          className="languageButton"
          onClick={() => changeLangue("fr")}
        ></img>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/510px-Flag_of_the_United_Kingdom.svg.png"
          className="languageButton"
          onClick={() => changeLangue("en")}
        ></img>
      </Row>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <Link to={"/screenMyArticlesBySource/" + item.id}>
                    {item.name}
                  </Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { articleList: state.articleList, language: state.language };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: function (language) {
      dispatch({ type: "changeLanguage", language });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
