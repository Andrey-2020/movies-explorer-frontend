import React from "react";
import "./AboutMe.css";
import { Link } from "react-router-dom";
import  myImage  from "../../images/my-image.jpg";
function AboutMe() {
    return (
        <section className="about" id="about">
            <h3 className="about__subtitle">Студент</h3>
            <div className="about__content">
                <div className="about__container">
                    <h4 className="about__content-name">Виталий</h4>
                    <h4 className="about__content-profession">Фронтенд-разработчик, 30 лет</h4>
                    <p className="about__content-description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className="about__content-socials">
                        <Link className="about__content-social"  target="_blank" to="#">Facebook</Link>
                        <Link className="about__content-social"  target="_blank" to="#">Github</Link>
                    </div>
                </div>
                <img className="about__content-photo" src={myImage} alt="Мое фото"/>
            </div>
        </section>

    );
}

export default AboutMe;
