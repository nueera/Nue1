'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Save, X, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductCampaign } from '@/modules/marketing/types';

interface ProductCampaignFormProps {
  campaign?: ProductCampaign;
  onSave?: (data: Partial<ProductCampaign>) => void;
  onCancel?: () => void;
}

export function ProductCampaignForm({ campaign, onSave, onCancel }: ProductCampaignFormProps) {
  const isEditing = !!campaign;
  const [name, setName] = useState(campaign?.name ?? '');
  const [type, setType] = useState<string>(campaign?.type ?? 'promotion');
  const [productId, setProductId] = useState(campaign?.productId ?? '');
  const [startDate, setStartDate] = useState(campaign?.startDate?.split('T')[0] ?? '');
  const [endDate, setEndDate] = useState(campaign?.endDate?.split('T')[0] ?? '');
  const [discount, setDiscount] = useState(campaign?.discount?.toString() ?? '');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSave?.({
      name,
      type: type as ProductCampaign['type'],
      productId,
      startDate,
      endDate,
      discount: discount ? Number(discount) : undefined,
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
      <Card className="border-border/50 max-w-lg mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-emerald-600" />
              {isEditing ? 'Edit Campaign' : 'Create Product Campaign'}
            </CardTitle>
            {onCancel && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pc-name">Campaign Name</Label>
            <Input id="pc-name" placeholder="e.g., Summer Sale" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="launch">Launch</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="clearance">Clearance</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="bundle">Bundle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-discount">Discount %</Label>
              <Input id="pc-discount" type="number" placeholder="0" value={discount} onChange={(e) => setDiscount(e.target.value)} min={0} max={100} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pc-product">Product ID</Label>
            <Input id="pc-product" placeholder="Select or enter product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pc-start">Start Date</Label>
              <Input id="pc-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-end">End Date</Label>
              <Input id="pc-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pc-desc">Description</Label>
            <Textarea id="pc-desc" placeholder="Campaign description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSubmit} disabled={!name || !startDate || !endDate}>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update' : 'Create'}
            </Button>
            {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
