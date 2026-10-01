import {
  BookOpen,
  BriefcaseBusiness,
  House,
  ArrowUpRight,
  MapPin,
  Check,
  Sparkles,
  Globe2,
} from "lucide-react";
export function HomeVisual() {
  return (
    <div
      className="home-visual"
      role="img"
      aria-label="Connected worldwide support for study and career, with accommodation support in London"
    >
      <div className="visual-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="visual-plus plus-one">+</span>
      <span className="visual-plus plus-two">+</span>
      <div className="visual-location">
        <Globe2 size={13} /> SUPPORTING STUDENTS WORLDWIDE
      </div>
      <div className="visual-card visual-study">
        <div className="visual-card-top">
          <span className="icon-tile">
            <BookOpen size={24} />
          </span>
          <ArrowUpRight size={17} />
        </div>
        <span className="visual-card-label">01 / STUDY · WORLDWIDE</span>
        <strong>
          A clearer mind.
          <br />A stronger start.
        </strong>
        <div className="visual-card-bottom">
          <span>
            <Check size={12} />
          </span>{" "}
          Learn with confidence
        </div>
      </div>
      <div className="visual-card visual-career">
        <div className="visual-card-top">
          <span className="icon-tile">
            <BriefcaseBusiness size={23} />
          </span>
          <ArrowUpRight size={17} />
        </div>
        <span className="visual-card-label">02 / CAREER · WORLDWIDE</span>
        <strong>
          Big ambitions.
          <br />
          Practical next steps.
        </strong>
        <div className="mini-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <ArrowUpRight size={28} />
        </div>
      </div>
      <div className="visual-card visual-living">
        <div className="visual-card-top">
          <span className="icon-tile">
            <House size={23} />
          </span>
          <span className="london-pill">
            <MapPin size={11} /> LONDON
          </span>
        </div>
        <span className="visual-card-label">03 / ACCOMMODATION</span>
        <strong>
          A new city.
          <br />A place to belong.
        </strong>
        <div className="living-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="visual-note">
        <Sparkles size={17} />
        <span>A little support. A lot of possibility.</span>
      </div>
    </div>
  );
}
