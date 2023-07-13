import { withDesign } from "storybook-addon-designs";
import Main from "../../pages/Main";
import design from "../assets/offices/_Page.png";
import { RESOLUTIONS, generateStory } from "../_tools/StoryFactory";

export default {
  title: "App/Layout",
  component: Main,
  decorators: [withDesign],
  args: { inStory: true },
};

export const M = generateStory(RESOLUTIONS.MediumDesktop);
export const L = generateStory(RESOLUTIONS.LargeDesktop);
export const XL = generateStory(RESOLUTIONS.ExtraLargeDesktop);
export const S = generateStory(RESOLUTIONS.SmallDesktop);
export const TabletLandscape = generateStory(RESOLUTIONS.TabletLandscape);
export const TabletPortrait = generateStory(RESOLUTIONS.TabletPortrait);
