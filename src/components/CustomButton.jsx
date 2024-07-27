const CustomButton = ({ type, containerStyles, title }) => (
  <button type={type} className={containerStyles}>
    {title}
  </button>
);

export default CustomButton;
