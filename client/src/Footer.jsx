const Footer = ({contracts}) => {
  return (
    <footer>
      <p className="text-center">
        Token Exchange{" "}
        <a href="https://edulazaro.com" style={{ color: "white" }}>
          edulazaro.com
        </a>
      </p>

      <div className="text-sm px-4 py-2">
        <span className="contract-address">
          Contract address:{" "}
          <span className="address">{contracts.dex.options.address}</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
