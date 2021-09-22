<template>
  <main>
    <Nuxt />
  </main>
  <!-- <div class="app-layout">
    <header>
      <div v-if="width > 992" class="top-strip">
        <div class="container">
          <div class="top-strip-wrap">
            <a class="home-page" href="#">Министерство науки и высшего образования Российской Федерации</a>
            <div class="language">
              <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4443 13.889L11.5554 6.11121L7.6665 13.889" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.77783 11.6667H14.3334" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.44434 1.11121V2.77787" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 2.77783H9.88886" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.66665 2.77783C7.66665 4.54594 6.96427 6.24162 5.71403 7.49186C4.46379 8.7421 2.7681 9.44448 1 9.44448" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.60205 5.00012C4.0624 6.29941 4.91402 7.42414 6.03977 8.2196C7.16552 9.01506 8.51008 9.44217 9.88851 9.44218" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="select-wrap">
                <v-select v-model="language" :options="['Русский']" :searchable="false" :clearable="false"></v-select>
              </div>
              </div>
            <div class="notice disabled">
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.39844 1H8.73176" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.0673 8.46478C12.0998 10.7943 12.5985 12.1675 13.0416 12.9321C13.0928 13.0163 13.1207 13.1126 13.1225 13.2111C13.1243 13.3097 13.0999 13.4069 13.0518 13.4929C13.0037 13.5789 12.9337 13.6506 12.8488 13.7006C12.7639 13.7507 12.6672 13.7773 12.5687 13.7777H1.56125C1.13913 13.7777 0.859582 13.3222 1.07376 12.9584C1.53599 12.1734 2.06566 10.7273 2.06566 8.22216C2.06574 7.51646 2.21516 6.81877 2.50411 6.17494C2.79305 5.5311 3.21498 4.9557 3.74215 4.48656C4.26933 4.01741 4.88981 3.66514 5.56284 3.45289C6.23586 3.24064 6.94618 3.17322 7.64712 3.25506C10.22 3.5453 12.0312 5.87586 12.0673 8.46478Z" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.28769 13.7777C9.28769 14.3671 9.05357 14.9323 8.63682 15.3491C8.22007 15.7658 7.65485 15.9999 7.06548 15.9999C6.47611 15.9999 5.91088 15.7658 5.49413 15.3491C5.07739 14.9323 4.84326 14.3671 4.84326 13.7777" stroke="#A6AEBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Нет новых уведомлений
            </div>
            <div class="username">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.02423 15.6799L4.0404 17.3075C3.8653 17.403 3.70794 17.5203 3.56152 17.6482C5.30118 19.1151 7.54688 20 10.0005 20C12.436 20 14.6674 19.1283 16.4021 17.6815C16.2421 17.5464 16.0685 17.4248 15.8761 17.329L12.6809 15.7316C12.2681 15.5252 12.0073 15.1033 12.0073 14.6418V13.3882C12.0972 13.2859 12.1998 13.1546 12.3096 12.9995C12.7451 12.3844 13.0745 11.7078 13.3028 10.9979C13.7127 10.8715 14.0145 10.493 14.0145 10.0432V8.70506C14.0145 8.41072 13.8836 8.1477 13.6802 7.96354V6.02917C13.6802 6.02917 14.0776 3.01892 10.0009 3.01892C5.92421 3.01892 6.32157 6.02917 6.32157 6.02917V7.96354C6.1178 8.1477 5.98723 8.41072 5.98723 8.70506V10.0432C5.98723 10.3957 6.17251 10.7059 6.44988 10.8851C6.78422 12.3406 7.65971 13.3882 7.65971 13.3882V14.6108C7.65934 15.0561 7.41556 15.4663 7.02423 15.6799Z" fill="#EBEEF3"/>
                <path d="M10.1711 0.00148915C4.64912 -0.0928522 0.0958315 4.30723 0.00149013 9.82922C-0.0520958 12.9602 1.3434 15.7742 3.56533 17.6456C3.71062 17.5188 3.86647 17.4026 4.03968 17.3082L7.02351 15.6806C7.41483 15.4671 7.65861 15.0569 7.65861 14.6108V13.3882C7.65861 13.3882 6.78275 12.3406 6.44878 10.8851C6.17179 10.7058 5.98613 10.396 5.98613 10.0432V8.70505C5.98613 8.4107 6.11708 8.14768 6.32048 7.96352V6.02915C6.32048 6.02915 5.92311 3.0189 9.99979 3.0189C14.0765 3.0189 13.6791 6.02915 13.6791 6.02915V7.96352C13.8829 8.14768 14.0134 8.4107 14.0134 8.70505V10.0432C14.0134 10.493 13.7116 10.8715 13.3017 10.9979C13.0734 11.7077 12.744 12.3844 12.3085 12.9995C12.1987 13.1546 12.0961 13.2859 12.0062 13.3882V14.6418C12.0062 15.1033 12.267 15.5255 12.6798 15.7316L15.875 17.329C16.0667 17.4248 16.2399 17.546 16.3995 17.6807C18.5543 15.8837 19.9464 13.1968 19.9981 10.1711C20.0932 4.64912 15.6935 0.0958305 10.1711 0.00148915Z" fill="#A6AEBF"/>
              </svg>
              Чернов А. Б.
            </div>
          </div>
        </div>
      </div>
      <div class="header">
        <div v-if="width > 992" class="haeder-bg-left"></div>
        <div v-if="width > 992" class="haeder-bg-right"></div>
        <div class="container">
  
          <div class="custom-row">
            <div v-if="width > 992" class="left-section">
              <a href="#">
                <img src="../assets/img/logo.png" alt="Цифровая платформа исследователя">
              </a>
              <div class="site-name">Цифровая платформа <br> исследователя</div>
              <div class="site-type">Федеральный портал</div>
            </div>
            <div class="right-section">
              <div v-if="width > 992" class="navigation">
                <ul>
                  <li>
                    <a href="https://test.sciencenet.ru/">О платформе</a>
                  </li>
                  <li>
                    <a href="https://test.sciencenet.ru/competitions">Гранты и конкурсы</a>
                  </li>
                  <li>
                    <a href="https://test.sciencenet.ru/scientific_projects">Научные проекты</a>
                  </li>
                  <li>
                    <a href="#">Аналитика</a>
                  </li>
                </ul>
              </div>
              <h1 class="h1">Аналитические данные</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <Nuxt />
    </main>
    <footer>
      <div class="container">
        <div class="row">
          <div v-show="width > 992" class="col-lg-3">
            <div class="footer-logo">
              <img class="img-fluid" src="../assets/img/svg/footer-logo.svg" alt="">
            </div>
          </div>
          <div v-show="width > 992" class="col-lg-6">
            <div class="footer-nav">
              <ul>
                <li><a class="footer-link" href="#">О платформе</a></li>
                <li><a class="footer-link" href="#">Гранты и конкурсы</a></li>
                <li><a class="footer-link" href="#">Научные проекты</a></li>
                <li><a class="footer-link" href="#">Аналитика</a></li>
              </ul>
              <div class="copywriter">2020 Министерство науки и высшего образования Российской Федерации</div>
            </div>
          </div>
          <div v-show="width < 992" class="col-sm-6">
            <div class="copywriter">2020<br> Министерство науки и высшего образования Российской Федерации</div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="footer-info">
              <ul>
                <li><a class="footer-link" href="#">Условия использования</a></li>
                <li><a class="footer-link" href="#">Политика конфиденциальности</a></li>
                <li><a class="footer-link" href="#">Контакты</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div> -->
</template>

<script>
