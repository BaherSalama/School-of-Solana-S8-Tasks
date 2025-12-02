import { SoulsendAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { SoulsendUiButtonClose } from './soulsend-ui-button-close'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  KitchenSinkToolbar,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import React from 'react'
import { ChevronDownIcon } from "@radix-ui/react-icons";


export function SoulsendUiCard({ account, soulsend }: { account: UiWalletAccount; soulsend: SoulsendAccount }) {
  return (
    <Accordion
      className="Accordion w-full"
      type="multiple"
    >
      <AccordionItem className="AccordionItem w-full" value="item-3">
        <AccordionHeader className='prose lg:prose-xl' style={{ "width": "100%", "textAlign": "center", "maxWidth": "100%" }}>
          {soulsend.data.heading}
        </AccordionHeader>
        <AccordionTrigger className='AccordionTrigger w-full'>
          {"Take A look"}
          <ChevronDownIcon className="AccordionChevron" aria-hidden />
        </AccordionTrigger>
        <AccordionContent className='AccordionContent'>
          <MDXEditor
            markdown={soulsend.data.content}
            contentEditableClassName={"prose"}
            readOnly={true}
            plugins={[
              listsPlugin(),
              quotePlugin(),
              headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
              linkPlugin(),
              linkDialogPlugin(),
              imagePlugin(),
              tablePlugin(),
              thematicBreakPlugin(),
              frontmatterPlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
              codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' } }),
              diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
              markdownShortcutPlugin()
            ]}
          />
          {account.address == soulsend.data.owner ? <SoulsendUiButtonClose account={account} soulsend={soulsend} /> : ""}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
