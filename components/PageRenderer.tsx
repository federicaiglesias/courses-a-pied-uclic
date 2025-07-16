import HeroBlock from "./blocks/HeroBlock";
import TextBlock from "./blocks/TextBlock";
import ContactFormBlock from "./blocks/ContactFormBlock";
import type { PageBlock } from "@/types/types";

type Props = {
  blocks: PageBlock[];
  lang?: "fr" | "en";
};

export default function PageRenderer({ blocks, lang = "fr" }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={i} markdown={block.markdown ?? ""} />;
          case "hero":
            return (
              <HeroBlock
                key={i}
                title={block.title}
                subtitle={block.subtitle}
              />
            );
          case "contact_form":
            return (
              <ContactFormBlock
                key={i}
                title={block.title}
                subtitle={block.subtitle}
              />
            );

          case "list_events":
            return (
              <div key={i} className="text-green-600 text-center py-4">
                List events block: {JSON.stringify(block.content)}
              </div>
            );
          default:
            return (
              <div key={i} className="text-red-600 text-center py-4">
                Unknown block type: {block.type}
              </div>
            );
        }
      })}
    </>
  );
}
