import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";
import Airing from "./Airing";
import Popular from "./Popular";
import Upcoming from "./Upcoming";

const HomePage = () => {
  //
  const [rendered, setRendered] = useState("popular");

  //
  const {
    handleSubmit,
    handleChange,
    search,
    getUpcomingAnime,
    getAiringAnime,
  } = useGlobalContext();

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Animes"
              : rendered === "airing"
              ? "Airing Animes"
              : "Upcoming Animes"}
          </h1>
        </div>
        <div className="search-container">
          <form action="" onSubmit={handleSubmit} className="search-form">
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="cat">
            <div className="filter-btn popular-filter">
              <button
                onClick={() => {
                  setRendered("popular");
                }}
              >
                Popular
              </button>
            </div>

            <div className="filter-btn airing-filter">
              <button
                onClick={() => {
                  setRendered("airing");
                  getAiringAnime();
                }}
              >
                Airing
              </button>
            </div>
            <div className="filter-btn upcoming-filter">
              <button
                onClick={() => {
                  setRendered("upcoming");
                  getUpcomingAnime();
                }}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>
      </header>
      {switchComponent()}
    </HomepageStyled>
  );
};

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    padding: 2rem 5rem;
    width: 100%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 70%;
    }
    @media screen and (max-width: 1000px) {
      padding: 2rem 0;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      @media screen and (max-width: 1000px) {
        gap: 0.5rem;
      }
      @media screen and (max-width: 600px) {
        padding: 1rem;
      }
      .cat {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
        @media screen and (max-width: 500px) {
          padding: 0.7rem 0.7rem;
        }
      }

      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default HomePage;
