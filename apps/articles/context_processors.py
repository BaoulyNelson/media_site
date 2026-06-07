from .models import Categorie


def categories_processor(request):
    return {
        'nav_categories': Categorie.objects.all()[:6]
    }


def journalist_processor(request):
    """Expose si l'utilisateur est journaliste ou admin dans tous les templates."""
    is_journalist = False
    if request.user.is_authenticated:
        is_journalist = (
            request.user.is_staff or
            request.user.groups.filter(name='Journalistes').exists()
        )
    # On injecte dans l'objet user pour simplifier l'usage dans les templates
    if request.user.is_authenticated:
        request.user.is_journalist_or_staff = is_journalist
    return {}
