'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabLayoutProps {
  defaultValue?: string;
  tabs: Tab[];
}

export function TabLayout({ defaultValue, tabs }: TabLayoutProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className="space-y-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="tab-content-fade">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
