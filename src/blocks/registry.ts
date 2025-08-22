import Hero from "./Hero.astro";
import RichText from "./RichText.astro";
import Grid from "./Grid.astro";
import Cta from "./Cta.astro";
import PostsList from "./PostsList.astro";
import FormBlock from "./FormBlock.astro";

export const registry = {
  hero: Hero,
  rich_text: RichText,
  grid: Grid,
  cta: Cta,
  posts_list: PostsList,
  form: FormBlock,
} as const;

