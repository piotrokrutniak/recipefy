import parse from "html-react-parser";
import { MarkUpStyler } from "./MarkUpStyler";

export function QuillMarkUpParser({ instructions, sectionId }: { instructions: string, sectionId?: string}) {
  return (
    <section id={sectionId}>
      <div>
        <MarkUpStyler>
          {parse(instructions || "<p className='opacity-80'>Nic tu nie ma.</p>")}
        </MarkUpStyler>
      </div>
    </section>
  );
}
