import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Sobre } from './components/Sobre';
import { ComoPenso } from './components/ComoPenso';
import { ComoTrabalho } from './components/ComoTrabalho';
import { Skills } from './components/Skills';
import { Plataformas } from './components/Plataformas';
import { Projetos } from './components/Projetos';
import { Contato } from './components/Contato';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <ComoPenso />
        <ComoTrabalho />
        <Skills />
        <Plataformas />
        <Projetos />
      </main>
      <Contato />
    </>
  );
}
