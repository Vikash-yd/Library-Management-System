import './GlassCard.css';
import CardButton from './CardButton';

function GlassCard({ title, imgSrc, buttonText, onButtonClick }) {
  return (
    <div className="glass-card">
      {imgSrc && <img src={imgSrc} alt={title} className="card-image" />}
      <h3 className="card-title">{title}</h3>
      {buttonText && <CardButton text={buttonText} onClick={onButtonClick} />}
    </div>
  );
}

export default GlassCard;   