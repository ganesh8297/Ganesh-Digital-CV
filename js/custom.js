!(function ($) {
  "use strict";

  var DATA_URL = "data/portfolio.json";

  function applyPortfolioData(data) {
    if (data.portfolio) renderPortfolio(data.portfolio);
    if (data.projects) renderProjects(data.projects);
    if (data.education) renderEducation(data.education);
    if (data.experience) renderExperience(data.experience);
    if (data.skills) renderSkills(data.skills);
    reloadPortfolioIsotope();
    initResumeSkillBars();
  }

  function renderResumeItems(items, $container) {
    if (!items || !items.length) return;
    var html = items
      .map(function (it) {
        return (
          '<div class="resume-item"><span class="item-arrow"></span>' +
          '<h5 class="item-title">' +
          esc(it.title) +
          "</h5><span class=\"item-details\">" +
          esc(it.details) +
          "</span>" +
          '<p class="item-description">' +
          esc(it.description) +
          "</p></div>"
        );
      })
      .join("");
    $container.html(html);
  }

  function renderEducation(items) {
    renderResumeItems(items, $("#resume-education-items"));
  }

  function renderExperience(items) {
    renderResumeItems(items, $("#resume-experience-items"));
  }

  function renderSkillOne(skill) {
    var pct = Math.min(100, Math.max(0, Number(skill.percentage) || 0));
    return (
      '<div class="single-skill" data-percentage="' +
      pct +
      '">' +
      '<div class="skill-info"><span class="skill-name">' +
      esc(skill.name) +
      '</span><span class="skill-percentage"></span></div>' +
      '<div class="progress skill-progress">' +
      '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>' +
      "</div></div>"
    );
  }

  function renderSkills(skills) {
    if (!skills || !skills.length) return;
    var mid = Math.ceil(skills.length / 2);
    var left = skills.slice(0, mid);
    var right = skills.slice(mid);
    $("#resume-skills-left").html(left.map(renderSkillOne).join(""));
    $("#resume-skills-right").html(right.map(renderSkillOne).join(""));
  }

  function initResumeSkillBars() {
    $("#resume .skills-section .single-skill").each(function () {
      var $el = $(this);
      var t = Math.min(100, Math.max(0, $el.data("percentage")));
      var i = $el.find(".skill-progress").outerWidth(true);
      var a = i - i * (t / 100);
      $el.find(".skill-percentage").text(t + "%").css("margin-right", a);
      $el.find(".progress-bar").attr("aria-valuenow", t).css("width", t + "%");
    });
  }

  var QUOTE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#009f66" class="bi bi-quote" viewBox="0 0 16 16"><path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" /></svg>';

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderPortfolio(items) {
    if (!items || !items.length) return;
    var html = items
      .map(function (item) {
        var cat = item.category || "mobile";
        var wrapClass = item.wideWrapper ? "portfolio-wrapperm" : "portfolio-wrapper";
        return (
          '<div class="single-item col-12 col-lg-12 ' +
          esc(cat) +
          '">' +
          '<p style="color:#9d9d9d" class="section-description">' +
          esc(item.title) +
          "</p>" +
          '<div class="' +
          wrapClass +
          '"><img class="img-fluid" alt="" src="' +
          esc(item.image) +
          '">' +
          '<div class="item-content">' +
          '<h6 class="content-title">' +
          esc(item.contentTitle) +
          "</h6>" +
          // '<span class="content-more">More Info</span>' +
          "</div></div></div>"
        );
      })
      .join("");
    $("#portfolio-grid").html(html);
  }

  function renderProjectLinks(links) {
    if (!links || !links.length) return "";
    return links
      .map(function (l) {
        return (
          '<h6 style="color:#fff" class="client-name">' +
          esc(l.label) +
          ' : <a style="font-size:13px;color:#009f66 !important" href="' +
          esc(l.url) +
          '">' +
          esc(l.url) +
          " </a></h6>"
        );
      })
      .join("");
  }

  function renderProjectInner(p) {
    return (
      '<div class="single-review swiper-slide">' +
      '<div class="review-header d-flex justify-content-between">' +
      '<div class="review-client">' +
      '<div class="media"><img class="img-fluid rounded-circle client-avatar" src="' +
      esc(p.avatar) +
      '" alt="Client">' +
      '<div class="client-details">' +
      '<h6 class="client-name">' +
      esc(p.clientName) +
      "</h6>" +
      '<span class="client-role">' +
      esc(p.clientRole) +
      "</span>" +
      "</div></div></div>" +
      QUOTE_SVG +
      "</div>" +
      '<p class="review-content">' +
      esc(p.description) +
      "</p>" +
      '<h6 style="color:#009f66" class="client-name">Team : <span style="color:#fff">' +
      esc(p.team) +
      "</span></h6>" +
      '<h6 style="color:#009f66" class="client-name">Role : <span style="color:#fff">' +
      esc(p.role) +
      "</span></h6>" +
      '<h6 style="color:#009f66" class="client-name">Technology used : <span style="color:#fff">' +
      esc(p.technology) +
      "</span></h6>" +
      renderProjectLinks(p.links) +
      "</div>"
    );
  }

  function renderProjectSlide(p) {
    var inner = renderProjectInner(p);
    if (p.subsectionHeading) {
      return (
        '<div style="margin-bottom: 15px;" class="slider-item">' +
        '<p style="align-items: center;text-align: center;" class="section-description">' +
        esc(p.subsectionHeading) +
        "</p>" +
        inner +
        "</div>"
      );
    }
    return '<div style="margin-bottom: 15px;" class="slider-item">' + inner + "</div>";
  }

  function renderProjects(projects) {
    if (!projects || !projects.length) return;
    var parts = [];
    if (projects[0].sectionHeading) {
      parts.push(
        '<p style="align-items: center;text-align: center;" class="section-description">' +
          esc(projects[0].sectionHeading) +
          "</p>"
      );
    }
    projects.forEach(function (p) {
      parts.push(renderProjectSlide(p));
    });
    $("#projects-slider").html(parts.join(""));
  }

  function reloadPortfolioIsotope() {
    var $grid = $("#portfolio .portfolio-section .portfolio-grid");
    $grid.imagesLoaded(function () {
      var $filterActive = $("#portfolio .portfolio-section .filter-control li.tab-active");
      var filter = ($filterActive.length && $filterActive.data("filter")) || "*";
      if ($grid.data("isotope")) {
        $grid.isotope("reloadItems").isotope({ filter: filter, transitionDuration: ".25s" });
      }
    });
  }

  function showLoadError() {
    var msg =
      '<p class="section-description" style="color:#9d9d9d">Content could not be loaded. Add <code>data/portfolio.js</code> (run <code>python3 scripts/sync_portfolio_js.py</code>) or serve the site over HTTP so <code>data/portfolio.json</code> loads.</p>';
    $("#portfolio-grid").html(msg);
    $("#projects-slider").html(msg);
    $("#resume-education-items").html("");
    $("#resume-experience-items").html("");
    $("#resume-skills-left, #resume-skills-right").html("");
  }

  $(function () {
    function run(data) {
      applyPortfolioData(data);
    }

    var isFile = window.location.protocol === "file:";
    if (isFile) {
      if (window.PORTFOLIO_DATA) {
        run(window.PORTFOLIO_DATA);
      } else {
        showLoadError();
      }
      return;
    }

    $.getJSON(DATA_URL)
      .done(run)
      .fail(function () {
        if (window.PORTFOLIO_DATA) {
          run(window.PORTFOLIO_DATA);
        } else {
          showLoadError();
        }
      });
  });
})(jQuery);
