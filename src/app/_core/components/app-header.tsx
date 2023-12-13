import AppNavigationBar from './top-navigation-bar/top-navigation-bar';

function AppHeader() {
  return (
    <header className="sticky top-0 mx-5 mb-4  flex border-b-2 border-gray-600 pb-2 pt-7 align-bottom">
      <h2 className="ml-4 text-2xl font-semibold ">
        <strong className="text-white">Flatland</strong>
        <strong className="text-blue-300">ASP</strong>
      </h2>
      <AppNavigationBar />
    </header>
  );
}

export default AppHeader;
