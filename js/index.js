const projectsContainer = document.getElementById('projects-container');

const createElement = (tag, property = false, value = false) => {
  const element = document.createElement(tag);
  if (property) element[property] = value;
  return element;
}

projects.forEach((project) => {
  const { image, name, description, link } = project;

  const projectContainer = createElement('section', 'className', 'project');

  const h4 = createElement('h4', 'innerHTML', name);
  projectContainer.appendChild(h4);
  const span = createElement('button', 'className', 'material-icons information');
  span.innerHTML = 'info';
  projectContainer.appendChild(span);

  const projectDataContainer = createElement('div', 'className', 'project-data');

  const descriptionContainer = createElement('div', 'className', 'description');

  const h5 = createElement('h5', 'innerHTML', 'Descrição');

  const p = createElement('p', 'innerHTML', description);

  descriptionContainer.appendChild(h5);
  descriptionContainer.appendChild(p);

  projectDataContainer.appendChild(descriptionContainer);

  const skillsContainer = createElement('section', 'className', 'skills');

  const h5Skills = createElement('h5', 'innerHTML', 'Tecnologias utilizadas neste projeto');

  const ul = createElement('ul');

  project.skills.forEach((skill) => {
    const li = createElement('li', 'innerHTML', skill);
    ul.appendChild(li);
  });

  skillsContainer.appendChild(h5Skills);
  skillsContainer.appendChild(ul);
  projectDataContainer.appendChild(skillsContainer);

  const a = createElement('a', 'href', link);
  a.innerHTML = "Clique aqui para acessar este projeto"

  projectDataContainer.appendChild(a);
  projectContainer.appendChild(projectDataContainer);
  projectsContainer.appendChild(projectContainer);
});

