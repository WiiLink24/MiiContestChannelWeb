<template>
<div class="copyright" style={top}>
    <div class="holder" style={maxwidth}>
      <div class="footer-holder" style={flex}>
        <div class="column" style="width:20%; min-width:300px; gap:16px;">
          <img
            loading="lazy"
            class="footer-logo logo"
            src="/img/viewingTool-logo.png"
            alt="WiiLink Mii Contest Channel Viewer Logo"
            height="60px"
            style="filter:invert(1); z-index:0;"
          />
          <p
            style="color:#ffffff80; margin-top:15px; opacity:0.7; margin-right:8px; text-align:left;"
          >
            <i class="fa-solid fa-globe-americas" style="margin-right:5px;"></i>
            {{ $t('footer.site_by') }}
            <a href="https://github.com/humanoidear"
              >
              <u>Alex</u></a
            > and <a href="https://github.com/kouacc"
            ><u>Kouacc</u></a>
          </p>
          <p
            style="color:#ffffff80; margin-top:-10px; opacity:0.7; margin-right:8px; text-align:left;"
          >
            <i class="fa-solid fa-envelope-open" style="margin-right:5px;"></i>
            <a href="mailto:contact@wiilink24.com"><u>contact@wiilink24.com</u></a
            >
          </p>
          <p
            style="color:#ffffff80; margin-top:-10px; opacity:0.7; margin-right:8px; text-align:left;"
          >
            <a href="https://www.wiilink24.com" style="margin-right:5px; display:flex; flex-direction: row; align-items: center; gap:4px;"
              ><img src="/img/favicon.png" alt="WiiLink Logo" style="filter:brightness(10000); height:20px !important;"> {{ $t('footer.main_site') }}</a
            >
          </p>
        </div>
        <div class="tables-holder columns" style={flex}>
          <div class="column">
            <h4><b>{{ $t('footer.pages') }}</b></h4>
            <hr
              style="width: 60px; border-top:2px solid white; transform:translate(0, -5px); margin:0px;"
            />
            <a href="/" class="animated-link">{{ $t('footer.home') }}</a>
            <a href="/plaza/popular" class="animated-link">{{ $t('footer.popular') }}</a>
            <a href="/plaza/top" class="animated-link"
              >{{ $t('footer.top') }}</a
            >
            <a href="/artisans" class="animated-link">{{ $t('footer.artisans') }}</a
            >
            <a href="/contests/active" class="animated-link">{{ $t('footer.contests') }}</a
            >
          </div>
          <div class="column">
            <h4><b>{{ $t('footer.github') }}</b></h4>
            <hr
              style="width: 60px; border-top:2px solid white; transform:translate(0, -5px); margin:0px;"
            />
            <a href="https://github.com/WiiLink24" class="animated-link">{{ $t('footer.github_link') }}</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/repositories"
              class="animated-link">{{ $t('footer.repository') }}</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/projects"
              class="animated-link">{{ $t('footer.projects') }}</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/teams"
              class="animated-link">{{ $t('footer.teams') }}</a
            >
            <a
              href="https://github.com/orgs/WiiLink24/people"
              class="animated-link">{{ $t('footer.people') }}</a
            >
          </div>
          <div class="column">
            <h4><b>{{ $t('footer.socials') }}</b></h4>
            <hr
              style="width: 60px; border-top:2px solid white; transform:translate(0, -5px); margin:0px;"
            />
            <a
              href="https://discord.gg/wiilink"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="discord.gg/wiilink"
              ><i style="margin-right:5px;" class="fa-brands fa-discord"
              ></i>{{ $t('footer.discord') }}</a
            >
            <div class="dropdown">
              <a href="https://twitter.com/wiilink24" class="dropdown-toggle" data-bs-toggle="dropdown">
                <i style="margin-right:10px;" class="fa-brands fa-twitter"
                ></i>{{ $t('footer.twt') }}
              </a>
            </div>
            <a
              href="https://github.com/WiiLink24"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="WiiLink24"
              ><i style="margin-right:10px;" class="fa-brands fa-github"
              ></i>{{ $t('footer.github_link') }}</a
            >
            <a
              href="https://www.patreon.com/WiiLink24"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="Donate!"
              ><i style="margin-right:10px;" class="fa-brands fa-patreon"
              ></i>{{ $t('footer.patreon') }}</a
            >
            <a
              href="https://www.youtube.com/@wiilink"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="WiiLink24"
              ><i style="margin-right:5px;" class="fa-brands fa-youtube"
              ></i>{{ $t('footer.youtube') }}</a
            >
          </div>
          <div class="column">
            <h4><b>{{ $t('footer.repos') }}</b></h4>
            <hr
              style="width: 60px; border-top:2px solid white; transform:translate(0, -5px); margin:0px;"
            />
            <a
              href="https://github.com/WiiLink24/WiiLink24-Patcher"
              class="animated-link">{{ $t('footer.patcher') }}</a
            >
            <a
              href="https://github.com/WiiLink24/wfc-server"
              class="animated-link">{{ $t('footer.wfc') }}</a
            >
            <a href="https://github.com/WiiLink24/web" class="animated-link"
              >{{ $t('footer.website') }}</a
            >
            <a
              href="https://github.com/WiiLink24/food-server"
              class="animated-link">{{ $t('footer.food') }}</a
            >
            <a
              href="https://github.com/WiiLink24/room-server"
              class="animated-link">{{ $t('footer.room') }}</a
            >
          </div>
        </div>
      </div>
  
      <hr class="hr" style={display} />
      <div class="footer-holder" style={display}>
        <h4 class="slogan">{{ $t('footer.slogan') }}
        <br><br>
        © 2020-2024 <b style="font-family:Rubik;">{{ $t('footer.wiilink') }} </b><b style="font-family:Gilroy;">
          {{ $t('footer.team') }}</b
        ></h4>
    </div>
  
    <div class="footer-holder legal" style={display}>
      <a href="https://www.wiilink24.com/tos">
        <i class="fas fa-arrow-right" style="margin-right:5px;"></i>{{ $t('footer.tos') }}</a
      >
      <a href="https://www.wiilink24.com/privacy-policy"
        ><i class="fas fa-arrow-right" style="margin-right:5px;"></i>
        {{ $t('footer.privacy') }}</a
      >
      <a href="https://www.wiilink24.com/eula"
        ><i class="fas fa-arrow-right" style="margin-right:5px;"></i>
        {{ $t('footer.eula') }}</a
      >
    </div>
  </div>
</div>
</template>
  
  <style>
    h4,
    p,
    a {
      color: white !important;
    }
    .copyright {
      bottom: 0;
      position: relative;
      left: 0;
      width: 100%;
      background: linear-gradient(
        41deg,
        rgba(0, 138, 255, 1) 0%,
        rgba(255, 0, 59, 1) 100%
      );
      background-color: rgb(28, 28, 28);
      top: 150px;
      z-index: 0;
      background-size: cover;
    }

    h4 {
        font-size:24px;
    }

    hr {
        margin-top:4px;
        opacity:20%;
        position: relative;
    }
  
    .columns {
      width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      justify-content: space-between;
      align-items: start;
    }
    .dropdown:hover .dropdown-menu {
      display: block;
    }
    a {
      border-radius: 4px;
    }
  
    .copyright::before {
      content: "";
      display: block;
      height: var(--remove-border, 3px);
      background-color: rgba(255, 255, 255, 0.1);
      width: 100%;
    }
    .dropdown-item:hover {
      background-color: #121212 !important;
    }
  
    .footer-holder {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: start;
      flex-direction: row;
      gap: 18px;
      position: relative;
    }
    a,
    p {
      color: white;
      text-decoration: none;
      font-size: 18px;
    }
    a:hover {
      text-decoration: underline;
    }
    .animated-link {
      position: relative;
      display: inline-block;
      transition: 0.5s;
    }
  
    .animated-link::before {
      content: "\f105";
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      position: absolute;
      left: -20px;
      opacity: 0;
      transition: all 0.5s ease;
    }
    .animated-link:hover {
      padding-left: 25px;
      transition: 0.5s;
    }
    .animated-link:hover::before {
      left: 0px;
      opacity: 1;
    }
    .column {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .hr {
      border-top: 2px solid white;
      margin: 30px 0px;
    }
    .holder {
      width: 98%;
      max-width: 1200px;
      padding: 30px;
      margin: auto;
    }
    .legal {
      margin-top: 30px;
      opacity: 0.3;
      display: flex;
      justify-content: space-between;
      align-items: start;
      transition: 0.5s;
    }
    .legal:hover {
      opacity: 1;
      transition: 0.5s;
    }
    .slogan {
      width: 100%;
    }
  
    .oliver {
      transform:translate(5px, -75px);
      height:100px;
      z-index:1;
      position:absolute;
    }
  
    @media (max-width: 1200px) {
      .tables-holder {
        width: 100% !important;
      }
      .legal {
        flex-direction: column;
        gap: 10px;
      }
    }
  </style>
  