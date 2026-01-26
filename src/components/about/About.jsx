import './About.css';

function About() {
  return (
    <section className="wrapper about">
      <h2>About the project</h2>

      <p>
        DreamViz is a full-stack web application that allows users to generate AI
        images from text prompts.
      </p>

      <p>
        The project was built to explore real-world application architecture,
        including user authentication, protected routes, API usage, backend
        validation, and UI state management. Users can generate images, view
        their generation history, download or share results, and manage their
        account securely.
      </p>

      <p>
        To prevent abuse and control costs, image generation is limited per user
        and enforced on the backend. The application includes clear error
        handling, loading states, and user feedback to ensure a smooth
        experience.
      </p>

      <p>
        DreamViz was developed over several months as a personal portfolio
        project, focusing on clean code, scalability, and thoughtful UI/UX
        decisions.
      </p>
    </section>
  );
}

export default About;