"""
Marketing Endpoints — Full CRUD + Dashboard + Analytics
────────────────────────────────────────────────────────
Channels, Campaigns, Email Templates, Social Posts,
Content Pages, Analytics Events.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.channel import Channel
from app.models.campaign import Campaign
from app.models.email_template import EmailTemplate
from app.models.social_post import SocialPost
from app.models.content_page import ContentPage
from app.models.analytics_event import AnalyticsEvent

from app.schemas.channel import ChannelCreate, ChannelUpdate, ChannelResponse
from app.schemas.campaign import CampaignCreate, CampaignUpdate, CampaignResponse
from app.schemas.email_template import EmailTemplateCreate, EmailTemplateUpdate, EmailTemplateResponse
from app.schemas.social_post import SocialPostCreate, SocialPostUpdate, SocialPostResponse
from app.schemas.content_page import ContentPageCreate, ContentPageUpdate, ContentPageResponse
from app.schemas.analytics_event import AnalyticsEventCreate, AnalyticsEventUpdate, AnalyticsEventResponse

router = APIRouter()


# ═══════════════════════════════════════════════════════════
#  DASHBOARD
# ═══════════════════════════════════════════════════════════

@router.get("/dashboard")
async def marketing_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Marketing dashboard with key metrics."""
    active_campaigns = await db.scalar(
        select(func.count(Campaign.id)).where(Campaign.status == "active")
    )
    total_campaigns = await db.scalar(select(func.count(Campaign.id)))
    total_budget = await db.scalar(
        select(func.coalesce(func.sum(Campaign.budget), 0)).where(Campaign.status.in_(["active", "scheduled"]))
    )
    total_spent = await db.scalar(
        select(func.coalesce(func.sum(Campaign.spent), 0))
    )
    total_impressions = await db.scalar(
        select(func.coalesce(func.sum(Campaign.impressions), 0))
    )
    total_clicks = await db.scalar(
        select(func.coalesce(func.sum(Campaign.clicks), 0))
    )
    total_conversions = await db.scalar(
        select(func.coalesce(func.sum(Campaign.conversions), 0))
    )
    total_leads = await db.scalar(
        select(func.coalesce(func.sum(Campaign.leads_generated), 0))
    )
    total_revenue = await db.scalar(
        select(func.coalesce(func.sum(Campaign.revenue_attributed), 0))
    )
    scheduled_posts = await db.scalar(
        select(func.count(SocialPost.id)).where(SocialPost.status == "scheduled")
    )
    published_posts = await db.scalar(
        select(func.count(SocialPost.id)).where(SocialPost.status == "published")
    )
    total_content = await db.scalar(select(func.count(ContentPage.id)))
    published_content = await db.scalar(
        select(func.count(ContentPage.id)).where(ContentPage.status == "published")
    )

    ctr = round((total_clicks / total_impressions * 100), 2) if total_impressions and total_impressions > 0 else 0.0
    conversion_rate = round((total_conversions / total_clicks * 100), 2) if total_clicks and total_clicks > 0 else 0.0
    cpl = round(total_spent / total_leads, 2) if total_leads and total_leads > 0 else 0.0  # cost per lead
    roi = round(((total_revenue - total_spent) / total_spent * 100), 2) if total_spent and total_spent > 0 else 0.0

    return {
        "module": "marketing",
        "summary": {
            "active_campaigns": active_campaigns or 0,
            "total_campaigns": total_campaigns or 0,
            "total_budget": round(total_budget or 0, 2),
            "total_spent": round(total_spent or 0, 2),
            "total_impressions": total_impressions or 0,
            "total_clicks": total_clicks or 0,
            "total_conversions": total_conversions or 0,
            "total_leads_generated": total_leads or 0,
            "total_revenue": round(total_revenue or 0, 2),
            "scheduled_posts": scheduled_posts or 0,
            "published_posts": published_posts or 0,
            "total_content_pages": total_content or 0,
            "published_content_pages": published_content or 0,
        },
        "calculated_metrics": {
            "ctr": ctr,
            "conversion_rate": conversion_rate,
            "cost_per_lead": cpl,
            "roi": roi,
        },
    }


# ═══════════════════════════════════════════════════════════
#  CHANNELS
# ═══════════════════════════════════════════════════════════

@router.get("/channels", response_model=list[ChannelResponse])
async def list_channels(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200),
    channel_type: str | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(Channel).offset(skip).limit(limit).order_by(Channel.name)
    if channel_type:
        query = query.where(Channel.channel_type == channel_type)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/channels", response_model=ChannelResponse, status_code=201)
async def create_channel(body: ChannelCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    channel = Channel(**body.model_dump())
    db.add(channel)
    await db.flush()
    await db.refresh(channel)
    return channel

@router.get("/channels/{channel_id}", response_model=ChannelResponse)
async def get_channel(channel_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Channel).where(Channel.id == channel_id))
    ch = result.scalars().first()
    if not ch:
        raise HTTPException(status_code=404, detail="Channel not found")
    return ch

@router.put("/channels/{channel_id}", response_model=ChannelResponse)
async def update_channel(channel_id: int, body: ChannelUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Channel).where(Channel.id == channel_id))
    ch = result.scalars().first()
    if not ch:
        raise HTTPException(status_code=404, detail="Channel not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(ch, key, value)
    await db.flush()
    await db.refresh(ch)
    return ch

@router.delete("/channels/{channel_id}", status_code=204)
async def delete_channel(channel_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Channel).where(Channel.id == channel_id))
    ch = result.scalars().first()
    if not ch:
        raise HTTPException(status_code=404, detail="Channel not found")
    await db.delete(ch)


# ═══════════════════════════════════════════════════════════
#  CAMPAIGNS
# ═══════════════════════════════════════════════════════════

@router.get("/campaigns", response_model=list[CampaignResponse])
async def list_campaigns(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200),
    status: str | None = Query(None), campaign_type: str | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(Campaign).offset(skip).limit(limit).order_by(Campaign.start_date.desc())
    if status:
        query = query.where(Campaign.status == status)
    if campaign_type:
        query = query.where(Campaign.campaign_type == campaign_type)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/campaigns", response_model=CampaignResponse, status_code=201)
async def create_campaign(body: CampaignCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    campaign = Campaign(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(campaign)
    await db.flush()
    await db.refresh(campaign)
    return campaign

@router.get("/campaigns/{campaign_id}", response_model=CampaignResponse)
async def get_campaign(campaign_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalars().first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/campaigns/{campaign_id}", response_model=CampaignResponse)
async def update_campaign(campaign_id: int, body: CampaignUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalars().first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(campaign, key, value)
    await db.flush()
    await db.refresh(campaign)
    return campaign

@router.delete("/campaigns/{campaign_id}", status_code=204)
async def delete_campaign(campaign_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalars().first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    await db.delete(campaign)


# ═══════════════════════════════════════════════════════════
#  EMAIL TEMPLATES
# ═══════════════════════════════════════════════════════════

@router.get("/email-templates", response_model=list[EmailTemplateResponse])
async def list_email_templates(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200),
    template_type: str | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(EmailTemplate).offset(skip).limit(limit).order_by(EmailTemplate.name)
    if template_type:
        query = query.where(EmailTemplate.template_type == template_type)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/email-templates", response_model=EmailTemplateResponse, status_code=201)
async def create_email_template(body: EmailTemplateCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    template = EmailTemplate(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(template)
    await db.flush()
    await db.refresh(template)
    return template

@router.get("/email-templates/{template_id}", response_model=EmailTemplateResponse)
async def get_email_template(template_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmailTemplate).where(EmailTemplate.id == template_id))
    template = result.scalars().first()
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    return template

@router.put("/email-templates/{template_id}", response_model=EmailTemplateResponse)
async def update_email_template(template_id: int, body: EmailTemplateUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmailTemplate).where(EmailTemplate.id == template_id))
    template = result.scalars().first()
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(template, key, value)
    await db.flush()
    await db.refresh(template)
    return template

@router.delete("/email-templates/{template_id}", status_code=204)
async def delete_email_template(template_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmailTemplate).where(EmailTemplate.id == template_id))
    template = result.scalars().first()
    if not template:
        raise HTTPException(status_code=404, detail="Email template not found")
    await db.delete(template)


# ═══════════════════════════════════════════════════════════
#  SOCIAL POSTS
# ═══════════════════════════════════════════════════════════

@router.get("/social-posts", response_model=list[SocialPostResponse])
async def list_social_posts(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200),
    platform: str | None = Query(None), status: str | None = Query(None),
    campaign_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(SocialPost).offset(skip).limit(limit).order_by(SocialPost.created_at.desc())
    if platform:
        query = query.where(SocialPost.platform == platform)
    if status:
        query = query.where(SocialPost.status == status)
    if campaign_id:
        query = query.where(SocialPost.campaign_id == campaign_id)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/social-posts", response_model=SocialPostResponse, status_code=201)
async def create_social_post(body: SocialPostCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    post = SocialPost(**body.model_dump(), owner_id=int(current_user["user_id"]))
    db.add(post)
    await db.flush()
    await db.refresh(post)
    return post

@router.get("/social-posts/{post_id}", response_model=SocialPostResponse)
async def get_social_post(post_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SocialPost).where(SocialPost.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Social post not found")
    return post

@router.put("/social-posts/{post_id}", response_model=SocialPostResponse)
async def update_social_post(post_id: int, body: SocialPostUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SocialPost).where(SocialPost.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Social post not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(post, key, value)
    await db.flush()
    await db.refresh(post)
    return post

@router.delete("/social-posts/{post_id}", status_code=204)
async def delete_social_post(post_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SocialPost).where(SocialPost.id == post_id))
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Social post not found")
    await db.delete(post)


# ═══════════════════════════════════════════════════════════
#  CONTENT PAGES
# ═══════════════════════════════════════════════════════════

@router.get("/content-pages", response_model=list[ContentPageResponse])
async def list_content_pages(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200),
    content_type: str | None = Query(None), status: str | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(ContentPage).offset(skip).limit(limit).order_by(ContentPage.created_at.desc())
    if content_type:
        query = query.where(ContentPage.content_type == content_type)
    if status:
        query = query.where(ContentPage.status == status)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/content-pages", response_model=ContentPageResponse, status_code=201)
async def create_content_page(body: ContentPageCreate, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    page = ContentPage(**body.model_dump(), author_id=int(current_user["user_id"]))
    db.add(page)
    await db.flush()
    await db.refresh(page)
    return page

@router.get("/content-pages/{page_id}", response_model=ContentPageResponse)
async def get_content_page(page_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ContentPage).where(ContentPage.id == page_id))
    page = result.scalars().first()
    if not page:
        raise HTTPException(status_code=404, detail="Content page not found")
    return page

@router.put("/content-pages/{page_id}", response_model=ContentPageResponse)
async def update_content_page(page_id: int, body: ContentPageUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ContentPage).where(ContentPage.id == page_id))
    page = result.scalars().first()
    if not page:
        raise HTTPException(status_code=404, detail="Content page not found")
    for key, value in body.model_dump(exclude_unset=True).items():
        setattr(page, key, value)
    await db.flush()
    await db.refresh(page)
    return page

@router.delete("/content-pages/{page_id}", status_code=204)
async def delete_content_page(page_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ContentPage).where(ContentPage.id == page_id))
    page = result.scalars().first()
    if not page:
        raise HTTPException(status_code=404, detail="Content page not found")
    await db.delete(page)


# ═══════════════════════════════════════════════════════════
#  ANALYTICS EVENTS
# ═══════════════════════════════════════════════════════════

@router.get("/analytics/events", response_model=list[AnalyticsEventResponse])
async def list_analytics_events(
    skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=500),
    event_type: str | None = Query(None), source: str | None = Query(None),
    campaign_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user),
):
    query = select(AnalyticsEvent).offset(skip).limit(limit).order_by(AnalyticsEvent.event_date.desc())
    if event_type:
        query = query.where(AnalyticsEvent.event_type == event_type)
    if source:
        query = query.where(AnalyticsEvent.source == source)
    if campaign_id:
        query = query.where(AnalyticsEvent.campaign_id == campaign_id)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/analytics/events", response_model=AnalyticsEventResponse, status_code=201)
async def create_analytics_event(body: AnalyticsEventCreate, db: AsyncSession = Depends(get_db)):
    event = AnalyticsEvent(**body.model_dump())
    db.add(event)
    await db.flush()
    await db.refresh(event)
    return event

@router.get("/analytics/events/{event_id}", response_model=AnalyticsEventResponse)
async def get_analytics_event(event_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalyticsEvent).where(AnalyticsEvent.id == event_id))
    event = result.scalars().first()
    if not event:
        raise HTTPException(status_code=404, detail="Analytics event not found")
    return event

@router.delete("/analytics/events/{event_id}", status_code=204)
async def delete_analytics_event(event_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalyticsEvent).where(AnalyticsEvent.id == event_id))
    event = result.scalars().first()
    if not event:
        raise HTTPException(status_code=404, detail="Analytics event not found")
    await db.delete(event)


# ═══════════════════════════════════════════════════════════
#  ANALYTICS REPORTS
# ═══════════════════════════════════════════════════════════

@router.get("/analytics/overview")
async def analytics_overview(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Overall analytics summary — top-level traffic & conversion stats."""
    total_events = await db.scalar(select(func.count(AnalyticsEvent.id)))
    total_page_views = await db.scalar(
        select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "page_view")
    )
    total_clicks = await db.scalar(
        select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "click")
    )
    total_conversions = await db.scalar(
        select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "conversion")
    )
    total_email_opens = await db.scalar(
        select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "email_open")
    )
    total_email_clicks = await db.scalar(
        select(func.count(AnalyticsEvent.id)).where(AnalyticsEvent.event_type == "email_click")
    )
    total_revenue = await db.scalar(
        select(func.coalesce(func.sum(AnalyticsEvent.event_value), 0))
        .where(AnalyticsEvent.event_type == "purchase")
    )

    # By source breakdown
    source_data = await db.execute(
        select(AnalyticsEvent.source, func.count(AnalyticsEvent.id))
        .group_by(AnalyticsEvent.source)
    )
    by_source = {row[0] or "unknown": row[1] for row in source_data.all()}

    return {
        "report": "analytics_overview",
        "total_events": total_events or 0,
        "total_page_views": total_page_views or 0,
        "total_clicks": total_clicks or 0,
        "total_conversions": total_conversions or 0,
        "total_email_opens": total_email_opens or 0,
        "total_email_clicks": total_email_clicks or 0,
        "total_revenue": round(total_revenue or 0, 2),
        "by_source": by_source,
    }


@router.get("/analytics/campaign-performance")
async def campaign_performance_report(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Per-campaign performance comparison."""
    result = await db.execute(
        select(
            Campaign.id, Campaign.name, Campaign.campaign_type, Campaign.status,
            Campaign.budget, Campaign.spent, Campaign.impressions, Campaign.clicks,
            Campaign.conversions, Campaign.leads_generated, Campaign.revenue_attributed,
        ).order_by(Campaign.revenue_attributed.desc())
    )
    rows = result.all()
    campaigns = []
    for r in rows:
        ctr = round((r[7] / r[6] * 100), 2) if r[6] and r[6] > 0 else 0.0
        conv_rate = round((r[8] / r[7] * 100), 2) if r[7] and r[7] > 0 else 0.0
        roi = round(((r[10] - r[5]) / r[5] * 100), 2) if r[5] and r[5] > 0 else 0.0
        campaigns.append({
            "id": r[0], "name": r[1], "type": r[2], "status": r[3],
            "budget": r[4], "spent": r[5],
            "impressions": r[6], "clicks": r[7],
            "conversions": r[8], "leads": r[9], "revenue": r[10],
            "ctr": ctr, "conversion_rate": conv_rate, "roi": roi,
        })

    return {"report": "campaign_performance", "campaigns": campaigns}


@router.get("/analytics/social-summary")
async def social_summary_report(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Social media performance aggregated by platform."""
    result = await db.execute(
        select(
            SocialPost.platform,
            func.count(SocialPost.id),
            func.coalesce(func.sum(SocialPost.likes), 0),
            func.coalesce(func.sum(SocialPost.comments), 0),
            func.coalesce(func.sum(SocialPost.shares), 0),
            func.coalesce(func.sum(SocialPost.impressions), 0),
            func.coalesce(func.sum(SocialPost.reach), 0),
        ).group_by(SocialPost.platform)
    )
    platforms = []
    for r in result.all():
        platforms.append({
            "platform": r[0], "total_posts": r[1],
            "total_likes": r[2], "total_comments": r[3],
            "total_shares": r[4], "total_impressions": r[5],
            "total_reach": r[6],
        })

    return {"report": "social_summary", "platforms": platforms}
