const AdFormNavigation = ({ step, onBack }: { step: number; onBack: () => void }) => {
    return (
      <div className="ad-form-navigation">
        {step > 1 && <button onClick={onBack}>Назад</button>}
      </div>
    );
  };
  
  export default AdFormNavigation;
  