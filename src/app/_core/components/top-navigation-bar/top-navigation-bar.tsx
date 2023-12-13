import NavigationBarElement from './navigation-bar-element';

function TopNavigationBar() {
  return (
    <ul className="ml-auto mr-40 flex gap-20 text-white">
      <NavigationBarElement title="Home" url="/" />
      <NavigationBarElement title="Environments" url="environments" />
      <NavigationBarElement title="Benchmark" url="benchmark" />
      <NavigationBarElement title="Documentation" url="documentation" />
      <NavigationBarElement title="About" url="about" />
    </ul>
  );
}

export default TopNavigationBar;
