import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
      <section className="project" id="project">
      <h3 className="project__title">О проекте</h3>
      <div className="project__content">
          <div className="project__content_container">
              <p className="project__content_subtitle">Дипломный проект включал 5 этапов</p>
              <p className="project__content_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="project__content_container">
              <p className="project__content_subtitle">На выполнение диплома ушло 5 недель</p>
              <p className="project__content_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
      </div>
      <div className="project__time">
          <div className="project__time-backend">1 неделя</div>
          <div className="project__time-frontend">4 недели</div>
      </div>
      <div className="project__case">
          <div className="project__case-backend">Back-end</div>
          <div className="project__case-frontend">Front-end</div>
      </div>
      </section>

  );
}

export default AboutProject;
