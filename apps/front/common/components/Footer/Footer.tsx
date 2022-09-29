import { TopBar, FluidContainer } from '@makinox/makinox-ui';

const Footer = () => {
  return (
    <footer className={TopBar()}>
      <div className={FluidContainer()} style={{ padding: '10px 0' }}>
        <span>Jesús Bossa - {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
