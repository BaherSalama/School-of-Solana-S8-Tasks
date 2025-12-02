'use client'
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
import React, { useState } from 'react'

import '@mdxeditor/editor/style.css'
import { useMarkdown } from '@/components/markdown/markdown-provider'
import { useHeading } from '@/components/markdown/heading-provider'
import { Input } from '@/components/ui/input'
<style>
</style>


export default function Page() {
  const ref = React.useRef<MDXEditorMethods>(null)

  const { markdown, setMarkdown } = useMarkdown();
  const { heading, setHeading } = useHeading();


  const updateMarkdown = () => {
    if (ref.current) {
      setMarkdown(ref.current.getMarkdown())
    }
  }

  return <div>
    <div className='flex flex-row'>
      <h1>Title</h1>
      <Input onChange={(e) => setHeading(e.target.value)}></Input>
    </div>
    <MDXEditor
      className=""
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
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
      markdown={markdown}
      onChange={updateMarkdown}
      contentEditableClassName="prose"
      ref={ref}
    />
  </div>
}
