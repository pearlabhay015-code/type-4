window.cusbFacultyDirectoryPromise = fetch('js/faculty-directory.json')
  .then((response) => response.ok ? response.json() : {})
  .catch(() => ({}));
