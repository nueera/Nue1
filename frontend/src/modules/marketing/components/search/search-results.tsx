// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Mail, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchResult {
  id: string;
  type: 'campaign' | 'contact' | 'lead' | 'workflow' | 'report';
  title: string;
  description: string;
  tags?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onSelect?: (result: SearchResult) => void;
}

const TYPE_ICONS: Record<string, typeof FileText> = {
  campaign: Mail,
  contact: Users,
  lead: Users,
  workflow: Zap,
  report: BarChart3,
};

export function SearchResults({ results, query, onSelect }: SearchResultsProps) {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-8 text-center">
          <p className="text-sm text-muted-foreground">No results found for &quot;{query}&quot;</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground mb-2">{results.length} results for &quot;{query}&quot;</p>
      {results.map((result, idx) => {
        const Icon = TYPE_ICONS[result.type] ?? FileText;
        return (
          <motion.div key={result.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
            onClick={() => onSelect?.(result)}
          >
            <Icon className="h-4 w-4 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{result.title}</p>
              <p className="text-xs text-muted-foreground truncate">{result.description}</p>
            </div>
            <Badge variant="secondary" className="text-xs shrink-0">{result.type}</Badge>
          </motion.div>
        );
      })}
    </div>
  );
}
