export default function Infocard({ img, title, text }) {
    return (
      <div className="info-container">
        <img className="info-image" src={img} alt={title} />
        <div className="info-text-container">
          <h2 className="info-title">{title}</h2>
          <p className="info-text">{text}</p>
        </div>
      </div>
    );
  }