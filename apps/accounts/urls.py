from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('connexion/', views.ConnexionView.as_view(), name='connexion'),
    path('deconnexion/', views.DeconnexionView.as_view(), name='deconnexion'),
    path('inscription/', views.InscriptionView.as_view(), name='inscription'),
    path('profil/', views.ProfilView.as_view(), name='profil'),
    path('profil/modifier/', views.ModifierProfilView.as_view(), name='modifier_profil'),
]
